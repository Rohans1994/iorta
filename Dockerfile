# FROM node:10

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install
FROM node:carbon as base
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm i npm@latest -g && npm install

FROM keymetrics/pm2:8-alpine
RUN apk -U upgrade && apk add curl && rm -rf /var/cache/apk/*
RUN npm install -g nodemon
WORKDIR /usr/src/app
COPY --from=base /usr/src/app .
ARG APP_ENV
ENV APP_ENV ${APP_ENV}
EXPOSE 3001
CMD ["nodemon", "index.js"]
