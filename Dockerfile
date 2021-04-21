FROM node:latest

WORKDIR /app
COPY /server.js ./server.js
COPY /site ./site

RUN npm install express
RUN npm install request

CMD ["node", "server.js"]