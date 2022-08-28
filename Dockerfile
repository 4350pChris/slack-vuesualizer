FROM node:current-alpine as build

ARG MODE=production

WORKDIR /app

RUN rm -rf /var/cache/apk/*
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:current-alpine as serve

ARG MODE=staging
ENV NODE_ENV=${MODE}

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV production
RUN npm install

COPY --from=build /app/.output ./.output
COPY --from=build /app/.nuxt ./.nuxt

EXPOSE 3000

CMD ["node", "./.output/server/index.mjs"]
