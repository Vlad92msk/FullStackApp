FROM alpine
RUN apk add git \
    && apk add yarn \
    && git clone https://github.com/Vlad92msk/FullStackApp.git \
    && cd ./FullStackApp \
    && yarn \
    && yarn build

WORKDIR ./FullStackApp_v2/server
CMD yarn start:prod

EXPOSE ${APP_PORT}
