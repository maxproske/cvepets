# Step 1. Rebuild the source code only when needed
# jsontoxml does not work on alpine
FROM --platform=linux/amd64 node:18 AS builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production

COPY src ./src
COPY public ./public
COPY next.config.js .

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG OV_PASSWORD
ENV OV_PASSWORD=${OV_PASSWORD}

RUN yarn build

# Step 2. Production image, copy all the files and run next
# jsontoxml does not work on alpine
# Add `--platform=linux/amd64` if you are building on an M1 Mac
# Digital Ocean Kubernetes expects linux/amd64 images
FROM --platform=linux/amd64 node:18 AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be present at run time
# https://github.com/vercel/next.js/discussions/14030
ARG OV_PASSWORD
ENV OV_PASSWORD=${OV_PASSWORD}

# We can use the node process itself here
CMD node server.js
