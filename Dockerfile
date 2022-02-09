FROM node:14-alpine
RUN npm install --global yarn
WORKDIR /app
ADD package.json package.json
RUN yarn --production
ADD . .
RUN yarn build
CMD ["node", ".dist/server/main.js"]
