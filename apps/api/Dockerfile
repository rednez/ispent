FROM node:lts

WORKDIR /app
COPY . .

ARG db_url
ARG firebase_project_id
ARG firebase_private_key
ARG firebase_client_email

ENV DATABASE_URL=${db_url}
ENV FIREBASE_PROJECT_ID=${firebase_project_id}
ENV FIREBASE_PRIVATE_KEY=${firebase_private_key}
ENV FIREBASE_CLIENT_EMAIL=${firebase_client_email}

RUN npm run prisma:generate
RUN npm run build:api:production

CMD ["npm", "run", "start:migrate:prod"]
