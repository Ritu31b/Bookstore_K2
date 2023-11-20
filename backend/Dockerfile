FROM node:20.9.0-alpine
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
EXPOSE 3001
COPY .env /app/.env
CMD ["npm", "run","dev"]