const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

console.log('Static files served from:', path.join(__dirname, 'public'));
console.log('Directory contents:', require('fs').readdirSync(path.join(__dirname, 'public')));

app.get('/health', (req, res) => res.json({ status: 'ok', port: process.env.PORT }));

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields.' });
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject || 'New Message'} — from ${name}`,
      html: `<div style="font-family:sans-serif;background:#060611;color:#eef0ff;padding:2rem;border-radius:12px;border:1px solid rgba(124,58,237,0.3)">
        <h2 style="background:linear-gradient(90deg,#a855f7,#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent">NEW MESSAGE — JOSHVA D PORTFOLIO</h2>
        <hr style="border-color:rgba(255,255,255,.08);margin:1rem 0"/>
        <p><b style="color:#22d3ee">From:</b> ${name}</p>
        <p><b style="color:#22d3ee">Email:</b> <a href="mailto:${email}" style="color:#a855f7">${email}</a></p>
        <p><b style="color:#22d3ee">Subject:</b> ${subject || '—'}</p>
        <hr style="border-color:rgba(255,255,255,.08);margin:1rem 0"/>
        <p style="line-height:1.75;color:rgba(238,240,255,.75)">${message.replace(/\n/g,'<br/>')}</p>
      </div>`
    });
    res.json({ success: true });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Email failed.' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`✅ Running → http://localhost:${PORT}`));
