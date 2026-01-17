FROM oven/bun:1.3.5-slim AS development
COPY package.json bun.lock /app/
WORKDIR /app
RUN bun install --frozen-lockfile
COPY . /app
CMD ["bun", "dev"]
