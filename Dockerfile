FROM oven/bun:latest AS build
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build

FROM nginx:alpine AS runtime
COPY ./nginx/nginx.conf.template /etc/nginx/nginx.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

# Set default PORT if not provided
ENV PORT=8080
EXPOSE ${PORT}

# Use envsubst to replace ${PORT} in the template and start nginx
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]