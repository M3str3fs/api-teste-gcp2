FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm

COPY . .

RUN nest build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
