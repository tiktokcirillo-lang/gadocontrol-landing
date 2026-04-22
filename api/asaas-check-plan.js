// Vercel Serverless Function — verifica se uid tem assinatura ativa no Asaas
module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { uid } = req.query;
  if (!uid) return res.status(400).json({ error: 'uid obrigatório' });

  const KEY  = process.env.ASAAS_API_KEY;
  const BASE = process.env.ASAAS_SANDBOX === 'false'
    ? 'https://api.asaas.com/v3'
    : 'https://sandbox.asaas.com/api/v3';

  const headers = { 'access_token': KEY };

  try {
    // Busca cliente pelo externalReference (uid do Firebase)
    const custRes  = await fetch(`${BASE}/customers?externalReference=${encodeURIComponent(uid)}`, { headers });
    const custData = await custRes.json();

    if (!custData.data?.length) {
      return res.status(200).json({ plan: 'free' });
    }

    const customerId = custData.data[0].id;

    // Verifica assinaturas ativas
    const subRes  = await fetch(`${BASE}/subscriptions?customer=${customerId}&status=ACTIVE`, { headers });
    const subData = await subRes.json();

    const hasActive = subData.data?.length > 0;
    return res.status(200).json({ plan: hasActive ? 'pro' : 'free' });
  } catch (e) {
    console.error('asaas-check-plan error:', e);
    return res.status(200).json({ plan: 'free' });
  }
};
