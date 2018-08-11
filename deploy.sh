#!/bin/bash -e

echo 'npm install...'
npm i

echo 'npm build...'
npm run build

echo 'docker build...'
docker build . -t pluviam/frontend

echo 'docker build...'
docker push pluviam/frontend

echo 'atualizando server...'
ssh -i key/pluviam administrador@165.227.250.0 bash -c "'
  cd docker
  docker-compose pull
  docker-compose down
  docker-compose up -d
'"