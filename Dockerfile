FROM node:20-alpine AS development
RUN corepack enable && corepack prepare pnpm@10.26.1 --activate
COPY package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install --frozen-lockfile
COPY . /app
CMD ["pnpm", "dev"]

