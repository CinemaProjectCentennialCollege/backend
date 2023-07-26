FROM node:18-alpine
WORKDIR /usr/src/cinerama
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]