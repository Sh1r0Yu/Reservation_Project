FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=3000

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "${PORT}"]
EXPOSE 3000

ENV PORT=3000
CMD ["npm", "start", "--port", "${PORT}"]