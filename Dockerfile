# Build stage
FROM node:22-alpine AS builder

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

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

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

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

EXPOSE ${PORT}

CMD ["node", ".output/server/index.mjs"]
