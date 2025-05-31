FROM node:20-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build
