#Docker
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY env.sh /docker-entrypoint.d/env.sh

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
