# Build stage
FROM node:16-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:16-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/build ./build

ENV PORT=3000

CMD ["serve", "-s", "build", "-l", "3000"]