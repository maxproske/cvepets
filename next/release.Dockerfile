# Note: jsontoxml does not work on alpine
FROM node:18

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
ARG OV_PASSWORD
ENV OV_PASSWORD=${OV_PASSWORD}

RUN yarn build

CMD yarn start
