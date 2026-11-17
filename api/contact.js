/**
 * Vercel Serverless Function: POST /api/contact
 * Meneruskan pesan dari form kontak ke Telegram.
 * Token ada di server, tidak pernah terkirim ke browser.
 */
const safeParse = (s) => { try { return JSON.parse(s); } catch { return {}; } };

const run = async (label, request, check) => {
  try {
    const res = await request;
    const data = await res.json().catch(() => null);
    const ok = res.ok && (check ? check(data) : true);
    if (!ok) console.error(`[contact] ${label} gagal`, res.status, data);
    return { label, ok };
  } catch (err) {
    console.error(`[contact] ${label} error`, err);
    return { label, ok: false };
  }
};

export default async function handler(req, res) {
  const E = process.env;
  res.setHeader('Access-Control-Allow-Origin', E.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  if (body.website) return res.status(200).json({ ok: true }); // honeypot: bot terjebak

  const name = String(body.name || '').trim().slice(0, 100);
  const email = String(body.email || '').trim().slice(0, 150);
  const message = String(body.message || '').trim().slice(0, 2000);
  if (!name || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Data tidak lengkap atau email tidak valid' });
  }

  const text = `📬 Pesan baru dari portofolio\n\nNama: ${name}\nEmail: ${email}\n\n${message}`;
  if (!E.TELEGRAM_BOT_TOKEN || !E.TELEGRAM_CHAT_ID) {
    return res.status(500).json({ ok: false, error: 'Konfigurasi Telegram belum lengkap di server' });
  }

  const result = await run('telegram', fetch(`https://api.telegram.org/bot${E.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: E.TELEGRAM_CHAT_ID, text }),
  }), (d) => d?.ok === true);

  if (!result.ok) return res.status(502).json({ ok: false, error: 'Gagal mengirim pesan ke Telegram' });
  return res.status(200).json({ ok: true, sent: ['telegram'] });
}