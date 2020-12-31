# The first stage
# Build React static files
FROM node:13.12.0-alpine as build

USER root
WORKDIR /app/frontend
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm ci --silent
COPY ./frontend/ ./
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:1.19.0-alpine

USER root
RUN rm /etc/nginx/conf.d/default.conf
COPY ./docker/nginx/development/default.conf /etc/nginx/default.conf
COPY --from=build /app/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
