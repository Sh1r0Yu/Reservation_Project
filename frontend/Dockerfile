# Build stage
FROM node:16-alpine as builder

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm ci

COPY . .

# Build the application
RUN CI=false npm run build

# Production stage
FROM node:16-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]