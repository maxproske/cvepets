FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production

COPY src ./src
COPY public ./public
COPY next.config.js .

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG IS_QA
ENV IS_QA=${IS_QA}

RUN yarn build

CMD yarn start
