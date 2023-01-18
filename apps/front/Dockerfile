FROM node:lts AS bilder

WORKDIR /app
COPY . .

RUN npx nx build front

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=bilder /app/dist/apps/front .
COPY /apps/front/nginx.conf /etc/nginx/conf.d/default.conf

