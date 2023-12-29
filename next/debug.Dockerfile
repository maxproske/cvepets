# syntax=docker/dockerfile:1

# Note: jsontoxml does not work on alpine
FROM node:18

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY src ./src
COPY public ./public
COPY next.config.js .

CMD yarn dev
