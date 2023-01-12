FROM node:16-alpine
WORKDIR /app

COPY ./bin ./bin
COPY ./index.js ./index.js
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

EXPOSE 8002

CMD ["npm", "start"]