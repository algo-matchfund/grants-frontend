# Grants frontend

## How to start KeyCloak
1. Run `docker run -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:11.0.2`
2. Go to `http://127.0.0.1:8080/auth`, login as `admin` with password `admin`
3. Create a realm, call it `grants`
4. Enable registration, login, and anything else you want in the Realm Login settings. Set all the themes to `keycloak`
5. Create a client with ID `grants-frontend`
6. Set client protocol to `openid-connect`, set login theme to `keycloak`, make sure Access Type is set to `public`
7. Set ROOT_URL to the URL of your frontend, e.g. `http://127.0.0.1:9000` in case of using dev server
8. Set Valid Redirect URIs to the URL of your frontend + wildcard, e.g. `http://127.0.0.1:9000/*` in case of using dev server
9. Set Web Origins to the URL of your frontend, e.g. `http://127.0.0.1:9000` in case of using dev server

## Test users

Project owner:
username: test@test.com
password: test123

Moderator:
username: admin@test.com
password: test123

# Run the frontend
1. Run `npm install`
2. Run `npm run start` to start dev server, then navigate to `http://127.0.0.1:9000`

or

1. Use cmake targets to build the image, then run `docker run -t registry.matchfund.app/grants-frontend:<commit_hash>`
