FROM node:latest

WORKDIR /app
COPY ./src/ ./src
COPY ./site/ ./site/

RUN npm install

CMD node dist/server.js