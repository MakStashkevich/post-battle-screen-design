# Install dependencies only when needed
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /post-battle-frontend

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /post-battle-frontend
COPY --from=deps /post-battle-frontend/node_modules ./node_modules
COPY .. .

# Start build production
RUN npm run build

# Prepare standalone node_modules
RUN node standalone.js


# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /post-battle-frontend

ENV NODE_ENV production

# Copy builded project files
COPY --from=builder /post-battle-frontend/build ./build

# Load only need modules & files for run server
COPY --from=builder /post-battle-frontend/.standalone/node_modules ./node_modules
COPY --from=builder /post-battle-frontend/server.js ./server.js

CMD ["node", "server.js"]