FROM node:latest

WORKDIR /app
COPY ./src/ ./src
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
ENV USE_DB=true
ENV PORT=5002
ENV DB_HOSTNAME=redis_db

RUN npm install
RUN npm run build

CMD node dist/index.js