FROM node:lts

WORKDIR /app
COPY . .
COPY libs/api/db/prisma ./prisma
RUN npm i
RUN npm run prisma:generate
RUN npm run build:api

CMD ["npm", "run", "start:migrate:prod"]
