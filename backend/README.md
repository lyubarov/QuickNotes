# Notes Backend (Nest.js + Prisma)

## Setup Instructions

1. Clone repo, cd to `backend/`.
2. Install dependencies: `npm install`.
3. Initialize Prisma: `npx prisma init` (if not already done).
4. Copy `.env.example` to `.env`, update values (e.g., `DATABASE_URL`).
5. Run migrations: `npm run prisma:dev` (or `make prisma`).
6. Start dev server: `npm run start:dev`.
7. Docker: `make build && make run`.

## API List

| Endpoint         | Method | Auth | Description                                      |
| ---------------- | ------ | ---- | ------------------------------------------------ |
| `/auth/register` | POST   | No   | Register user (body: {email, password})          |
| `/auth/login`    | POST   | No   | Login (body: {email, password}), sets JWT cookie |
| `/notes`         | GET    | Yes  | List user's notes                                |
| `/notes`         | POST   | Yes  | Create note (body: {title, content, tags[]})     |
| `/notes/:id`     | GET    | Yes  | Get note                                         |
| `/notes/:id`     | PATCH  | Yes  | Update note                                      |
| `/notes/:id`     | DELETE | Yes  | Delete note                                      |
| `/notes/search`  | GET    | Yes  | Search by tags (query: ?tags=tag1,tag2)          |

## Architecture & Tradeoffs

- **Prisma ORM**: Simplifies database operations with type-safe queries and migrations.
- **Modular Structure**: Feature-based for scalability. Tradeoff: More files vs. flat MVC.
- **JWT Auth**: Stateless for multi-instance scaling. Tradeoff: Secure cookie handling required.
- **Redis Caching**: Per-user/query for fast tag searches (5-min TTL).
- **Scaling**: Docker Compose. Health checks ensure reliability.
- **Security**: bcrypt for passwords, JWT expiry. Add rate-limiting for prod.

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string (e.g., `postgresql://user:pass@localhost:5432/notesdb`).
- `REDIS_HOST`, `REDIS_PORT`: Redis connection.
- `JWT_SECRET`: JWT signing key.
- `NODE_ENV`, `PORT`: App config.
- `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`: For Docker Compose compatibility.

## Notes

- Run `npx prisma studio` for DB visualization.
- Prisma migrations are applied automatically in Docker (`npx prisma migrate deploy`).
