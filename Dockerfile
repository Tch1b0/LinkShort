FROM node:latest

WORKDIR /app
COPY /server.js ./server.js
COPY /site ./site

RUN npm install express

CMD ["node", "server.js", ">", "logs/LinkShort.log"]