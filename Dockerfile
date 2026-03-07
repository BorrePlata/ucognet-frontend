# ── Stage 1: Build ──────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first (layer caching)
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy source and build
COPY public/ public/
COPY src/ src/
RUN npm run build

# Convert benchmark PNGs to WebP (originals kept as fallback)
RUN apk add --no-cache libwebp-tools && \
    for f in build/benchmarks/*.png; do cwebp -q 82 "$f" -o "${f%.png}.webp" 2>/dev/null; done

# ── Stage 2: Serve with nginx ──────────────────────────────
FROM nginx:1.25-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Healthcheck for Dokploy (use curl, more reliable)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Install curl for healthcheck (Alpine nginx image has wget but not always curl)
RUN apk add --no-cache curl

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
