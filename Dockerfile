FROM node:16.13.0-alpine
WORKDIR /app
ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn
ADD . .

RUN yarn build
#CMD ["node", "/app/dist/server/main.js"]
