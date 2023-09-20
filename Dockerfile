FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine AS blog
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable anonymous telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Generate Prisma Client
RUN yarn prisma generate

RUN yarn build

FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=blog /app/next.config.js ./
COPY --from=blog /app/next-i18next.config.js ./
COPY --from=blog /app/public ./public
COPY --from=blog /app/package.json ./package.json
COPY --from=blog --chown=nextjs:nodejs /app/.next ./.next
COPY --from=blog --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=blog /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
