#!/usr/bin/env sh

BACKEND_URL="$BACKEND_URL"
KEYCLOAK_URL="$KEYCLOAK_URL"
DEPLOYMENT_URL="$DEPLOYMENT_URL"

if [ "$BACKEND_URL" == '$BACKEND_URL' ] || [ "$BACKEND_URL" == "" ]; then
    echo "BACKEND_URL is not set, using localhost URL"
    export BACKEND_URL=http://127.0.0.1:8090
fi

if [ "$KEYCLOAK_URL" == '$KEYCLOAK_URL' ] || [ "$KEYCLOAK_URL" == "" ]; then
    echo "KEYCLOAK_URL is not set, using localhost URL"
    export KEYCLOAK_URL=http://127.0.0.1:8080
fi

if [ "$DEPLOYMENT_URL" == '$DEPLOYMENT_URL' ] || [ "$DEPLOYMENT_URL" == "" ]; then
    echo "DEPLOYMENT_URL is not set, using localhost URL"
    export DEPLOYMENT_URL=http://127.0.0.1:9000
fi

if [ "$ALGOD_TOKEN" == '$ALGOD_TOKEN' ] || [ "$ALGOD_TOKEN" == "" ]; then
    echo "ALGOD_TOKEN must be set to enable funding"
    break
fi

subst='$BACKEND_URL:$KEYCLOAK_URL:$DEPLOYMENT_URL:$ALGOD_TOKEN'

# Substitute
for file in /usr/share/nginx/html/*
do
    if [ -f $file ]; then
        envsubst $subst < $file | sponge $file
    fi
done

for file in /usr/share/nginx/html/static/js/*
do
    envsubst $subst < $file | sponge $file
done

echo "Docker runtime environment substitution done"

/usr/sbin/nginx -g 'daemon off;'
