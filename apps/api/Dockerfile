FROM rednez/ispent-base

WORKDIR /app
COPY . .

RUN npm run prisma:generate
RUN npm run build:api:production
