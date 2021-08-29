FROM node:14.17.5-alpine3.14

WORKDIR /app/material-ui/typescript 

COPY ./material-ui/typescript/package.json .
COPY ./material-ui/typescript/package-lock.json .
RUN npm install

CMD npm start
