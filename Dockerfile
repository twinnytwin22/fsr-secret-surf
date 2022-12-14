# node:16-alpine
FROM node@sha256:1a9a71ea86aad332aa7740316d4111ee1bd4e890df47d3b5eff3e5bded3b3d10 as package

WORKDIR /app

COPY package*.json yarn.lock ./

RUN apk add --no-cache python3 alpine-sdk && yarn

FROM package as builder

COPY . .

RUN sed -i 's/process.env/window.env/g' src/config.ts && \
    yarn build

# nginx:1.23.1-alpine
FROM nginx@sha256:4550bf745cc1cdb9bbf415dbef60b33ff5a6cd218e907c0863fcfaeaa6e00ad4 as release

WORKDIR /usr/share/nginx/html/

COPY --from=builder /app/build .
COPY nginx.app.conf /etc/nginx/conf.d/default.conf
COPY env_update.sh .
COPY default.env .env

RUN apk add --no-cache bash libxml2=2.9.14-r2 && \
    NOW=$(date "+%s") && \
    sed -i "s/<version>/${NOW}/g" index.html && \
    touch /var/run/nginx.pid && \
    chown -R nginx: /var/cache/nginx/ /usr/share/nginx/html/ /etc/nginx/ /var/run/nginx.pid

USER nginx

EXPOSE 3000

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env_update.sh && nginx -g \"daemon off;\""]