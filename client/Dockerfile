# FROM node:20
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# RUN npm rebuild esbuild
# RUN npm i -g serve
# USER node
# COPY --chown=node:node . .
# RUN npm run build
# EXPOSE 3000
# CMD [ "serve", "-s", "dist" ]

FROM node:19.4-bullseye AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

###
# FROM nginx:1.22-alpine
FROM nginxinc/nginx-unprivileged:1.23-alpine-perl
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /share/nginx/html
EXPOSE 8080
