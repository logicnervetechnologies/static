FROM node:14.17.5-alpine3.14

WORKDIR /app/frontend 

COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .
RUN npm install

CMD npm start
