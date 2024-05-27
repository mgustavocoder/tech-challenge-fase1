FROM node:16-alpine

WORKDIR /tech-challenge

COPY . /tech-challenge

RUN npm install

ENTRYPOINT [ "npm", "run", "start" ]