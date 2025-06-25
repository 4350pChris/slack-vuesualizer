FROM node:22-alpine

ARG MODE=production
ARG PORT=3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=${PORT}

WORKDIR /app

RUN rm -rf /var/cache/apk/*

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

ENV NODE_ENV=${MODE}

RUN npm run build

EXPOSE ${PORT}

CMD ["node", ".output/server/index.mjs"]
