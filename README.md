# Joshva D — Portfolio v3.0

## Structure
```
portfolio-joshva/
├── public/
│   └── index.html      ← Full portfolio (photo + all sections)
├── server.js           ← Express backend (contact form)
├── package.json
├── .env.example        ← Rename to .env and fill in
└── README.md
```

## Quick Start
```bash
npm install
cp .env.example .env    # add Gmail App Password
npm run dev             # http://localhost:3000
```

## Gmail App Password
Google Account → Security → 2-Step Verification → App Passwords → Mail

## Deploy Free on Vercel
1. Push to GitHub
2. Import on vercel.com
3. Add ENV vars: EMAIL_USER + EMAIL_PASS
4. Deploy!
