FROM node:16.13.0-alpine
RUN apk add git \
    && git clone https://github.com/Vlad92msk/FullStackApp.git \
    && cd FullStackApp \
    && yarn

WORKDIR ./FullStackApp
RUN yarn build
CMD ["node", "/FullStackApp/dist/server/main.js"]

EXPOSE 3000
