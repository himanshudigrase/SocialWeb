FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /app
ENV MONGO_URL $MONGO_URL
COPY package.json .
RUN npm install

COPY . .

EXPOSE 3001

CMD ["nodemon", "index.js"]