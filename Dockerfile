FROM node:20-alpine

ARG MODE=production
ARG PORT=3000
ARG VERSION=latest
ARG BUILD_DATE=latest

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=${PORT}
ENV NUXT_VERSION=${VERSION}
ENV NUXT_BUILD_DATE=${BUILD_DATE}

WORKDIR /app

RUN rm -rf /var/cache/apk/*

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

ENV NODE_ENV=${MODE}

RUN npm run build

EXPOSE ${PORT}

CMD ["node", ".output/server/index.mjs"]
