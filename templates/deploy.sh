#!/bin/bash

set -e

# enter your application directory, e.g. "/home/user/sourceCode/calcApp"
APP_DIR= #directory
SERVER_TAG="app-server:1.1"
CLIENT_TAG="app-client:1.1"
COMPOSE_FILE="calcApp.yaml"

echo "starting script..."
read -p "Prune stopped containers? [y/N]" confirm
if [[ "$confirm" == "y" || "$confirm" == "Y" ]]; then
  docker container prune -f
fi

echo "removing old docker images and volumes..."
docker rmi -f "$SERVER_TAG" || true
docker rmi -f "$CLIENT_TAG" || true
docker system prune -a --volumes -f

echo "navigating to project directory..."
cd "$APP_DIR"

echo "pulling latest code from git hub repository..."
git pull https://github.com/meadowGarden/calcApp.git

echo "adding .env to project..."
cp ../.env .
cp ../.env.production ./client

echo "building docker images..."
docker build -t $SERVER_TAG ./server/
docker build -t $CLIENT_TAG ./client/

echo "starting containers with docker compose..."
docker compose -f $COMPOSE_FILE up -d

echo "deployment completed"
