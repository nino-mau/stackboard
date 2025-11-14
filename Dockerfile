FROM node:20-alpine AS development
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install --frozen-lockfile
COPY . /app
CMD ["pnpm", "dev"]

