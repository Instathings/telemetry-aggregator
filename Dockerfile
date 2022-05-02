FROM node:16-alpine

WORKDIR /app
COPY src src
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY tsconfig.json tsconfig.json
RUN yarn install

CMD yarn start