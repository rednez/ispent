FROM rednez/ispent-base:1.4.0

WORKDIR /app
COPY . .

RUN npm run prisma:generate
RUN npm run build:api:production
