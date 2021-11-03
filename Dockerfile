FROM node:16.11.1

WORKDIR /api

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]