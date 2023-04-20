FROM node:16-alpine3.13

RUN mkdir -p /root/app
WORKDIR /root/app
COPY . .
RUN ls -a .
RUN node -v
RUN npm install
RUN ls -a /root/app
CMD [ "npm", "run", "start" ]

EXPOSE 9090