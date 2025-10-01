FROM node:20-alpine

RUN apk add --no-cache python3 make g++ libc6-compat

WORKDIR /app
COPY package*.json ./
RUN npm ci --build-from-source=bcrypt
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]