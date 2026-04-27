### Stage 1 — deps (install all dependencies, cache-friendly) ###
FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile || pnpm install

### Stage 2 — build (compile app + run velite) ###
FROM node:22-alpine AS build
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN pnpm build

### Stage 3 — runtime (slim: prod deps only) ###
FROM node:22-alpine AS runtime
WORKDIR /app
RUN apk add --no-cache libc6-compat tini
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts || pnpm install --prod --ignore-scripts

COPY --from=build /app/build ./build
COPY --from=build /app/public ./public

# Non-root user for safety
RUN addgroup -S app && adduser -S app -G app && chown -R app:app /app
USER app

EXPOSE 3000

# Simple healthcheck — expects the server to serve HTTP 200 on `/`
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ > /dev/null || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["pnpm", "start"]
