import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

type Data = {
  ok?: boolean;
  error?: string;
  info?: string;
};

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
// Default contact email set to Piyush's email as requested; can be overridden via env var
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'piyushjoshi4918@gmail.com';
const FROM_EMAIL = process.env.SENDGRID_FROM || CONTACT_EMAIL || 'no-reply@example.com';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' });

  if (!SENDGRID_API_KEY || !CONTACT_EMAIL) {
    // Development fallback: log message to server console so developer sees it locally
    console.log('[ContactForm] (dev fallback) New message:', { name, email, message });
    return res.status(200).json({ ok: true, info: 'No SENDGRID_API_KEY or CONTACT_EMAIL set — logged to server console (dev).' });
  }

  try {
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
      to: CONTACT_EMAIL,
      from: FROM_EMAIL,
      subject: `New contact from ${name} <${email}>`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message}</p>`,
    } as any;

    await sgMail.send(msg);
    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('[ContactForm] SendGrid error:', err?.toString?.() || err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
