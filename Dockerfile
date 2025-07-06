# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

ARG VERSION=latest
ARG BUILD_DATE=latest

ENV NUXT_VERSION=${VERSION}
ENV NUXT_BUILD_DATE=${BUILD_DATE}

COPY package.json pnpm-lock.yaml ./

RUN pnpm i

COPY . ./
RUN pnpm run build

# Production stage
FROM node:22-alpine AS production

ARG MODE=production
ARG PORT=3000
ARG VERSION=latest
ARG BUILD_DATE=latest

ENV NODE_ENV=${MODE}
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=${PORT}
ENV NUXT_VERSION=${VERSION}
ENV NUXT_BUILD_DATE=${BUILD_DATE}

WORKDIR /app

COPY --from=builder /app/.output ./

EXPOSE ${PORT}

CMD ["node", "/app/server/index.mjs"]
