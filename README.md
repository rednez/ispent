# iSpent

## The web app for spending accounting

See [ispent.pp.ua](https://ispent.pp.ua)

### Development

#### Requirements

- Node >18 (other versions didn't tested)
- Environments:
  - `DATABASE_URL` (
    example: `postgresql://postgres:DB_PASSWORD@DB_PATH:5432/DB_NANE?schema=public`).
    `DB_PATH` value should be `localhost` or `db` if you start Postgres and API
    together through the _docker-compose_.
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_PRIVATE_KEY`
  - `FIREBASE_CLIENT_EMAIL`
- Postgres.
- Firebase account with activated Auth module.

#### Develop the Api

- Run Postgres (port 5432) (`docker compose up db` - applying
  the `docker-compose.override.yml` config)
- `npm install`
- `npm run prisma:generate`
- `npm run start:api`

#### Develop the Front

- `npm install`
- `npm start` or `npm run front:hmr` with HMR

### Production

#### via Docker

- `docker compose -f docker-compose.yml -f docker-compose.prod.yml up`

#### Manually build and serve the bundles

- **API**
  - Postgres connection are required
  - `npm install`
  - `npm run prisma:generate`
  - `npm run build:api:production`
  - `npm run start:migrate:prod`
- **Front**
  - `npm install`
  - `npx nx build front`
  - `npx serve dist/apps/front` or as brutal dude via nginx

You are free to deploy the App in the other way that are more suitable for you.
