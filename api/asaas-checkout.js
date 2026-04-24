// Vercel Serverless Function — cria assinatura no Asaas e retorna URL de pagamento
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, name, uid } = req.body || {};
  if (!email || !uid) return res.status(400).json({ error: 'email e uid obrigatórios' });

  const KEY  = process.env.ASAAS_API_KEY;
  const BASE = process.env.ASAAS_SANDBOX === 'false'
    ? 'https://api.asaas.com/v3'
    : 'https://sandbox.asaas.com/api/v3';

  const headers = {
    'access_token': KEY,
    'Content-Type': 'application/json',
  };

  // 1. Busca ou cria cliente
  let customerId;
  try {
    const searchRes = await fetch(
      `${BASE}/customers?email=${encodeURIComponent(email)}`,
      { headers }
    );
    const searchData = await searchRes.json();

    if (searchData.data?.length > 0) {
      customerId = searchData.data[0].id;
    } else {
      const createRes = await fetch(`${BASE}/customers`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ name: name || email, email, externalReference: uid }),
      });
      const createData = await createRes.json();
      if (!createData.id) return res.status(500).json({ error: 'Falha ao criar cliente', details: createData });
      customerId = createData.id;
    }
  } catch (e) {
    return res.status(500).json({ error: 'Erro cliente Asaas', message: e.message });
  }

  // 2. Cria assinatura
  const nextDueDate = new Date().toISOString().split('T')[0];
  const returnUrl   = 'https://gadocontrole.com/app?upgraded=1';

  try {
    const subRes = await fetch(`${BASE}/subscriptions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        customer:          customerId,
        billingType:       'CREDIT_CARD',
        value:             49.90,
        nextDueDate,
        cycle:             'MONTHLY',
        description:       'GadoControl Pro — assinatura mensal',
        externalReference: uid,
      }),
    });
    const subData = await subRes.json();
    if (!subData.id) return res.status(500).json({ error: 'Falha ao criar assinatura', details: subData });

    // 3. Busca link de pagamento da primeira cobrança
    const payRes  = await fetch(`${BASE}/subscriptions/${subData.id}/payments`, { headers });
    const payData = await payRes.json();
    const payment = payData.data?.[0];

    if (!payment?.invoiceUrl) {
      return res.status(500).json({ error: 'URL de pagamento não encontrada' });
    }

    return res.status(200).json({
      url:            payment.invoiceUrl,
      subscriptionId: subData.id,
      paymentId:      payment.id,
    });
  } catch (e) {
    return res.status(500).json({ error: 'Erro assinatura', message: e.message });
  }
};
