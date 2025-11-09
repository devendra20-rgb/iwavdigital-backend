# iWaveDigital Monorepo

Structure:
- `/backend` — Node/Express API (gallery, contact, career)
- `/dashboard` — Next.js admin dashboard + public pages

## Backend
- Copy `.env.example` to `.env` and set `MONGODB_URI`
- Run: `npm i && npm run dev` inside `/backend`

Endpoints:
- `POST /api/gallery/upload` — fields: event, images[]
- `POST /api/gallery/upload-zip` — fields: event, zip
- `GET /api/gallery?event=...`
- `GET /api/events`
- `POST /api/contact` — { fullName, email, company, message }
- `POST /api/career` — multipart: fullName, email, position, message?, resume

## Dashboard
- Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL`
- Run: `npm i && npm run dev` inside `/dashboard`

