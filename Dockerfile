FROM node:16.11.1

WORKDIR /api

# COPY package*.json .
COPY . .

RUN npm install

CMD [ "npm", "start" ]