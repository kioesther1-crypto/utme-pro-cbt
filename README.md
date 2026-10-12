# UTME Pro CBT

A modern, professional JAMB UTME CBT practice platform built with Next.js, Prisma, PostgreSQL, and TailwindCSS.

## Features
- landing page with strong educational brand positioning
- registration and login pages
- student dashboard with performance metrics
- subject selection flow for UTME combinations
- CBT exam interface with timer and mock question navigation
- secure database schema and extensible structure for production use

## Stack
- Next.js 14
- React 18
- TailwindCSS
- Prisma ORM
- PostgreSQL

## Getting started

1. Copy `.env.example` to `.env` and set up your Postgres connection URL.
2. Install dependencies:

```bash
npm install
```

3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Run the app:

```bash
npm run dev
```

Then open http://localhost:3000.

## Notes
This repository includes a modern UX foundation and exam flow pattern. It is structured for a production rollout and can be extended with full authentication, database-backed exam logic, grading, and reporting.
