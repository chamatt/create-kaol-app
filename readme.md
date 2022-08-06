# Kaol Stack

## 🔦 About

A monorepo with Prisma, Next.js, Expo, tRPC, Authentication and Solito setup and configured to work together.
With this setup you can build a fullstack application with backend, frontend and mobile sharing 99% of the code, with full support for SSR and file structure navigation on nextjs, and full support for react native navigation on expo.

## ？Why

I created this project for a personal need, I wanted something like the create-t3-app, but sharing code between the mobile app and the nextjs app. I could not get any of the available repos on github to work the way I wanted, so I decided to try and put a few of them together and after a few days of banging my head against the wall I finally managed to do it in a good way. There are still a few things I want to do, but it's currently the best universal app monorepo template amongst what I could find.

## 📦 Included packages

- `Prisma`
- `solito` for cross-platform navigation
- `moti` for animations (basically framer-motion but works in both expo and web)
- `twrnc` tailwind for react native
- `Expo` SDK 44
- `Next.js` 12
- `tRPC` 9
- `React Navigation` 6
- `Authentication` with email/password pre-configured

## 🗂 Folder layout

- `apps` entry points for each app

  - `expo`
  - `next`

- `packages/` shared packages across apps
  - `app/` this is your main application that's used in both `expo` and `next` apps
    - `features/` screens of your app, organized by domains/feature
    - `provider/` (all the providers that wrap the app, and some no-ops for Web.)
    - `navigation/`
      - `native/` Next.js has a `pages/` folder. React Native doesn't. This folder contains react-navigation-related code for RN, you should place yours navigations like StackNavigation, BottomNavigation, etc, here.
        - `index.tsx` Entrypoint for react-navigation
      - `routePaths.tsx` - `!! IMPORTANT !!` Here you setup the route mapping between react-navigation routes and the URLs that they map to in your NextJS app.
  - `api/` your trpc api with your routes
  - `db/` your prisma db with a pre-populated sqlite file
     - `seeds/` Seeds for pre-populating te postgres database
  - `config/` your environment configs
  - `universal/` a place to put your universal components.
    - `universal/tailwind` exports some tailwind utilities that you will use to make components support tailwind className/tw prop.

You can add other folders inside of `packages/` if you know what you're doing and have a good reason to.

## 🏁 Start the app

Dependencies: You need docker installed and running to be able to run this stack, as the postgres database is in a docker container. If you're on mac or windows, just make sure `docker desktop` is opened.

- Install dependencies: `yarn`

- Run `yarn dev` for local development using turbo
- Or run `yarn dev:tabs` if you want to run web and mobile on different terminal tabs (needed if want to interact with expo CLI)

- It will open:
  - Prisma Studio `localhost:5555`
  - Expo `default to iOS simulator`
  - Next.js `localhost:4000`

## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it in `packages/app`:

```sh
cd packages/app
yarn add date-fns
cd ../..
yarn
```

### Native dependencies

If you're installing a library with any native code, you must install it in `apps/expo`:

```sh
cd apps/expo
yarn add react-native-reanimated

cd ../..
yarn
```

You can also install the native library inside of `packages/app` if you want to get autoimport for that package inside of the `app` folder. However, you need to be careful and install the _exact_ same version in both packages. If the versions mismatch at all, you'll potentially get terrible bugs. This is a classic monorepo issue. I use `lerna-update-wizard` to help with this (you don't need to use Lerna to use that lib).

### ‼ IMPORTANT

A lot of libraries aren't transpiled for next by default, so when you add a library make sure to add it to the transpile list in `next.config.js`, else they will problably not work.

```js
const withTM = require('next-transpile-modules')([
    ...
    // add it here
])
```

# Deploying to production (web and api)

This monorepo is pre-configured to work with vercel. You will need a postgres database, preferably with `pgBounger` enabled in `session` mode.

## Start the project in vercel

- Head to [vercel.com/new](https://vercel.com/new) and import your git repo that you created from this template.
- That's it for now, we'll come back to it later.

## Create a free database in supabase

- Setup a new database in supabase, wait a few minutes until it's fully setup.
- Head to `Settings -> Database`
- Scroll down until you found the section called `Connection Pooling`
- Make sure it's ENABLED
- Change the pool mode to `Session`
- Copy the connection string

With that connection string, you will have two environment variabled you need.

First one is the `MIGRATION_DB_URL`, this will be the connection string you copied above. This will be used during deployment to migrate the db to the latest migration.

First one is the `DATABASE_URL`, it will be the same connection string you copied above, but with `?pgbouncer=true&schema=public&connection_limit=1` appended at the end.
This is what the app will use, and it's has connection pool enabled, which is a requirement for serverless environments

## Setup environment variables in vercel

- Back to vercel.com, head to your app, then go to `Settings -> Environment Variables`
- Add the following environment variables (replace the values with your specific values)
  - Make sure to uncheck `Preview` and `Development`, and leave only `Production`

```sh
MIGRATION_DB_URL="postgres://<user>:<password>@<supabase_db_url>:6543/postgres"

DATABASE_URL="postgres://<user>:<password>@<supabase_db_url>:6543/<database>?pgbouncer=true&schema=public&connection_limit=1"

TOKEN_KEY="SOME_VERY_STRONG_SECRET_THAT_WILL_HASH_THE_PASSWORDS"
```

`!! IMPORTANT !!`

This will break preview apps because they won't have any databases. If you want them to work you can repeat the same steps above to create a NEW database on supabase, and setup new environment variables only for the `Preview` environment.

## Redeploy the app

After changing the environement variables, you will need to redeploy the app. To do that you need to push a new commit to the repository. You can have an empty commit like this:

```
git commit --alow-empty -m "redeploy"
git push origin master
```

## Done

Your are not done, your app should be up and running with authentication working.

## 🎙 Credits

This setup is heavily inspired on a few projects:

- [create-t3-app](https://github.com/t3-oss/create-t3-app)
- [create-solito-app](https://github.com/nandorojo/solito/tree/master/example-monorepos/blank)
- [zART-Stack](https://github.com/trpc/zart)
- [TENTS Stack](https://github.com/juliusmarminge/turbo-expo-next-starter)
