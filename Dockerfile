FROM node:15.11.0-alpine3.13 as builder

WORKDIR /app

RUN apk update \
&&  apk add --no-cache ca-certificates \
	git \
	make

COPY package.json package-lock.json /app/
RUN npm ci

# the respective values will be filled with strings, which are gonna be replaced in entrypoint
ENV BACKEND_URL='$BACKEND_URL'
ENV KEYCLOAK_URL='$KEYCLOAK_URL'
ENV DEPLOYMENT_URL='$DEPLOYMENT_URL'
ENV ALGOD_TOKEN='$ALGOD_TOKEN'

ENV PORT=8080
ENV KEYCLOAK_REALM=grants
ENV KEYCLOAK_CLIENT=grants-frontend

COPY ./ /app/
RUN npm run build

FROM nginx:alpine

RUN apk add moreutils --no-cache

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build ./
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./run-nginx.sh ./

RUN adduser -D grants-frontend
RUN chown -R grants-frontend \
    /etc/nginx/conf.d \
    /usr/share/nginx/html/ \
	/var/cache/nginx/ \
	/var/run/
USER grants-frontend

EXPOSE 8080

ENTRYPOINT [ "./run-nginx.sh" ]
