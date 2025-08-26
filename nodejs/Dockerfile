# Stage 1
FROM node:22-alpine AS builder
WORKDIR /usr/src/app


RUN apk add --no-cache wget
ENV DOCKERIZE_VERSION=v0.6.1
RUN wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin

COPY package*.json ./
RUN npm ci

COPY index.js ./

# Stage 2 prd
FROM node:22-alpine AS production
WORKDIR /usr/src/app

COPY --from=builder /usr/local/bin/dockerize /usr/local/bin/dockerize

COPY package*.json ./

RUN npm ci --only=production && \
    npm cache clean --force && \
    npm install

COPY --from=builder /usr/src/app/index.js ./

EXPOSE 3000
CMD ["node", "index.js"]
