# retweeter-app

> Retweet App is to register twitter user tokens into a Hasura GraphQL endpoint & give the ability to manage it's permissions

#### First thing to do is replace `.env.example` to `.env` and replace it's variable's values to your API KEYS and Hasura Endpoint

#### Twitter
Create a new app in https://developer.twitter.com and copy the keys. The callback URL are `BASE_URL` + `TWITTER_CALLBACK_URL` and `BASE_URL` + `TWITTER_AUTH_URL` from your your `.env` file.

#### Hasura
Create a new project in https://hasura.io you might need a https:/heroku.com/ account to connect a new app with postgreSQL to the Hasura project. Follow [these](https://hasura.io/docs/1.0/graphql/core/deployment/deployment-guides/heroku.html#securing-the-graphql-endpoint) instructions to set the `HASURA_GRAPHQL_ADMIN_SECRET` value, remember to use a strong string for instance from https://keygen.io

**Notes:**
— Twitter developer account might need 1 or 2 days before its usage.
— If you don'f find the bearer token you need to use the v2 of the Twitter api, you can upgrade it in the dashboard.
— Use https://keygen.io to copy a strong string in order to fill the `SESSION_SECRET` env variable.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
