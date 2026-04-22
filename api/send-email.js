// Vercel Serverless Function — envia email de boas-vindas via Gmail SMTP
const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nome, email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email obrigatório' });

  const firstName = (nome || 'Produtor').split(' ')[0];
  const appUrl = process.env.APP_URL || 'https://gadocontrol-landing.vercel.app/app';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"GadoControl" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `${firstName}, sua vaga no GadoControl está reservada!`,
      html: buildEmail(firstName, appUrl),
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('send-email error:', e);
    return res.status(500).json({ error: e.message });
  }
};

function buildEmail(firstName, appUrl) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Bem-vindo ao GadoControl</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f3;font-family:'Segoe UI',Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f3;padding:32px 16px;">
<tr><td align="center">

  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 24px rgba(0,0,0,.08);">

    <!-- header -->
    <tr>
      <td style="background:#15803d;padding:36px 40px 28px;text-align:center;">
        <p style="margin:0;font-size:11px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.55);">GESTÃO DE REBANHO</p>
        <h1 style="margin:8px 0 0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">GadoControl</h1>
      </td>
    </tr>

    <!-- corpo -->
    <tr>
      <td style="padding:40px 40px 32px;">

        <p style="margin:0 0 6px;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#15803d;">Vaga confirmada</p>
        <h2 style="margin:0 0 20px;font-size:24px;font-weight:800;color:#111827;line-height:1.2;">Oi, ${firstName}! Sua vaga<br>está reservada.</h2>

        <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.6;">
          Obrigado por entrar na lista de espera. Voce esta entre os primeiros produtores a ter acesso ao GadoControl — o sistema que coloca o controle do seu rebanho no bolso, sem complicacao.
        </p>

        <!-- próximos passos -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
          <tr>
            <td style="padding:16px;background:#f0fdf4;border-radius:12px;border-left:4px solid #15803d;">
              <p style="margin:0 0 16px;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#15803d;">O que acontece agora</p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                <tr>
                  <td width="32" valign="top" style="padding-top:1px;">
                    <div style="width:24px;height:24px;background:#15803d;border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:800;color:#fff;">1</div>
                  </td>
                  <td style="padding-left:10px;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#111827;">Acesse o app agora</p>
                    <p style="margin:2px 0 0;font-size:13px;color:#6b7280;">O GadoControl ja esta no ar. Voce pode comecar a explorar hoje mesmo.</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                <tr>
                  <td width="32" valign="top" style="padding-top:1px;">
                    <div style="width:24px;height:24px;background:#15803d;border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:800;color:#fff;">2</div>
                  </td>
                  <td style="padding-left:10px;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#111827;">Teste por 14 dias</p>
                    <p style="margin:2px 0 0;font-size:13px;color:#6b7280;">Sem cartao, sem fidelidade. Use tudo e veja o que faz sentido para sua fazenda.</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="32" valign="top" style="padding-top:1px;">
                    <div style="width:24px;height:24px;background:#15803d;border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:800;color:#fff;">3</div>
                  </td>
                  <td style="padding-left:10px;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#111827;">Fique de olho no email</p>
                    <p style="margin:2px 0 0;font-size:13px;color:#6b7280;">Vamos te avisar sobre novas funcionalidades e o lancamento oficial.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- CTA -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="${appUrl}" style="display:inline-block;background:#15803d;color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;letter-spacing:.3px;padding:16px 40px;border-radius:10px;">
                Acessar o GadoControl agora
              </a>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- rodapé -->
    <tr>
      <td style="padding:20px 40px 28px;border-top:1px solid #e5e7eb;text-align:center;">
        <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
          Voce recebeu este email porque se cadastrou na lista de espera do GadoControl.<br>
          Se foi engano, pode ignorar — nao vamos te incomodar.
        </p>
      </td>
    </tr>

  </table>

</td></tr>
</table>

</body>
</html>`;
}
