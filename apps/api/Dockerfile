FROM rednez/ispent-base:1.5.1

WORKDIR /app
COPY . .

RUN npm run prisma:generate
RUN npm run build:api:production
