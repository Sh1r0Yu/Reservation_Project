# Build stage
FROM node:16-alpine as builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set CI=false to prevent treating warnings as errors
ENV CI=false

# Build the application
RUN npm run build

# Production stage
FROM node:16-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]