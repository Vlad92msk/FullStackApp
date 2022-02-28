FROM node:16.13.0-alpine
RUN apk add git \
    && apk add yarn \
    && git clone https://github.com/Vlad92msk/FullStackApp.git \
    && cd ./FullStackApp \
    && yarn \
    && yarn build

WORKDIR /FullStackApp
CMD ["node", "dist/server/main.js"]

EXPOSE ${APP_PORT}
