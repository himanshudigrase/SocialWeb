FROM node:17-alpine
ARG MONGO_URL
RUN npm install -g nodemon

WORKDIR /app
COPY package.json .
RUN npm install

COPY . .
ENV MONGO_URL=$MONGO_URL
EXPOSE 3001

CMD ["nodemon", "index.js"]