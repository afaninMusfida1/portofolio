/**
 * Vercel Serverless Function: POST /api/contact
 * Meneruskan pesan dari form kontak ke Telegram, WhatsApp (Fonnte), dan/atau Email (Resend).
 * Kanal yang aktif ditentukan oleh environment variable yang terisi (lihat .env.example).
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
  const jobs = [];

  if (E.TELEGRAM_BOT_TOKEN && E.TELEGRAM_CHAT_ID) {
    jobs.push(run('telegram', fetch(`https://api.telegram.org/bot${E.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: E.TELEGRAM_CHAT_ID, text }),
    }), (d) => d?.ok === true));
  }

  if (E.FONNTE_TOKEN && E.WHATSAPP_TO) {
    jobs.push(run('whatsapp', fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: { Authorization: E.FONNTE_TOKEN },
      body: new URLSearchParams({ target: E.WHATSAPP_TO, message: text, countryCode: '62' }),
    }), (d) => d?.status !== false));
  }

  if (E.RESEND_API_KEY && E.MAIL_TO) {
    jobs.push(run('email', fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${E.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: E.MAIL_FROM || 'Portfolio <onboarding@resend.dev>',
        to: [E.MAIL_TO],
        reply_to: email,
        subject: `Pesan baru dari ${name}`,
        text,
      }),
    })));
  }

  if (jobs.length === 0) {
    return res.status(500).json({ ok: false, error: 'Belum ada kanal notifikasi yang dikonfigurasi di server' });
  }

  // Opsional: tetap simpan ke Google Sheet sebagai arsip
  if (E.GOOGLE_SCRIPT_URL) {
    run('sheet', fetch(E.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    }));
  }

  const results = await Promise.all(jobs);
  const sent = results.filter((r) => r.ok).map((r) => r.label);
  if (sent.length === 0) return res.status(502).json({ ok: false, error: 'Semua kanal notifikasi gagal' });
  return res.status(200).json({ ok: true, sent });
}