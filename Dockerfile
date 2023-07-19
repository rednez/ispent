FROM node:lts

WORKDIR /app
COPY . .

RUN npm install
RUN npm run prisma:generate
RUN npm run build:api:production

CMD [ "npm", "run", "start:migrate:prod" ]
