FROM node:8.16-alpine

ENV NODE_ENV production
# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN yarn install --production
RUN yarn build

EXPOSE 5000

CMD [ "yarn", "start" ]
