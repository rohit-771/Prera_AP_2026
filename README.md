# PRERA — Event & Brand Collaboration Platform

PRERA connects event organizers with brands and sponsors, and provides a way for students and professionals to apply to work with the PRERA team.

## Features

- Home, About, Events, Partners and Connect pages.
- Connect page follows the PRERA black-and-gold design.
- Two separate forms: **Host an Event / Event Collaboration** and **Join PRERA / Work With Us**.
- Both forms submit to the Express API and store submissions in PostgreSQL through Prisma.
- Server-side validation, rate limiting and generated reference IDs.
- Protected admin API endpoints for reviewing and managing submissions.

## Tech stack

- Frontend: React, Vite, React Router, CSS
- Backend: Node.js, Express
- Database: PostgreSQL, Prisma ORM

## Requirements

Install Node.js (LTS) and PostgreSQL. Keep the database running while using the app.

## 1. Configure PostgreSQL and backend

```bash
cd backend
npm install
```

Create a database named `prera_db` in PostgreSQL, then copy `.env.example` to `.env` and update `DATABASE_URL` with your PostgreSQL username and password.

Example:

```env
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/prera_db?schema=public"
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Do not commit `.env`; it contains credentials.

Generate Prisma Client and sync the schema:

```bash
npx prisma generate
npx prisma db push
```

Start the backend:

```bash
npm run dev
```

Backend health check: http://localhost:5001/api/health

## 2. Start the frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
```

Copy `frontend/.env.example` to `frontend/.env` (the default points to `http://localhost:5001/api`).

Start Vite:

```bash
npm run dev
```

Open the local URL printed by Vite, normally http://localhost:5173.

## 3. Test the two forms

1. Open **Let's Connect** in the navbar.
2. Select **Submit Event Details** to open the event collaboration form.
3. Fill all required fields and submit. A reference ID should appear after a successful save.
4. Go back and select **Explore Opportunities** to open the Join PRERA form.
5. Submit a valid application. It should also return a reference ID.

Submissions are stored in the PostgreSQL tables:

- `event_submissions`
- `work_applications`

You can inspect them in pgAdmin under `prera_db → Schemas → public → Tables`, then right-click a table and choose **View/Edit Data → All Rows**.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Backend and database health |
| POST | `/api/events` | Public event proposal submission |
| POST | `/api/applications` | Public work application submission |
| GET/PATCH/DELETE | `/api/events/*` | Admin-protected event management |
| GET/PATCH/DELETE | `/api/applications/*` | Admin-protected application management |
| `/api/admin/*` | Admin authentication and management |

## GitHub workflow

From the project root:

```bash
git status
git add .
git commit -m "Complete PRERA connect forms and API integration"
git push origin main
```

Review `git status` before committing. Never commit `.env` files or `node_modules`.

## Project structure

```text
PRERA/
├── frontend/
│   ├── public/
│   └── src/
│       ├── About_components/
│       ├── Contact_components/
│       │   ├── Connect-page.jsx
│       │   └── Connect-page.css
│       ├── Events_components/
│       ├── Home_components/
│       ├── Pages/
│       ├── Partners_compoonents/
│       ├── App.jsx
│       └── main.jsx
├── backend/
│   ├── prisma/schema.prisma
│   └── src/
└── dbms/
```

PRERA — Creating Connections. Enabling Collaborations. Building Experiences.
