# ---- Builder ----
FROM node:22-slim AS builder

WORKDIR /app

# Prisma needs openssl to generate/run its query engine
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

# Generate the Prisma client (schema only, no DB connection needed)
COPY prisma ./prisma
RUN npx prisma generate

# Drop dev dependencies, keep the generated client
RUN npm prune --omit=dev

# ---- Runner ----
FROM node:22-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Production node_modules (with generated Prisma client) from the builder
COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 5000

USER node

# API server. The worker runs from the same image by overriding the command:
#   docker run <image> node src/worker.js
CMD ["node", "src/server.js"]
