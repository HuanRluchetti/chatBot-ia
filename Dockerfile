FROM node:20-alpine

WORKDIR /usr/app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8000
CMD ["npm", "run", "dev"]