# Kaol Stack

## 🔦 About

A monorepo with Prisma, Next.js, Expo, tRPC and Solito setup and configured to work together.
With this setup you can build a fullstack application with backend, frontend and mobile sharing 99% of the code, with full support for SSR and file structure navigation on nextjs, and full support for react native navigation on expo.

## ？Why

I created this project for a personal need, I wanted something like the create-t3-app, but sharing code between the mobile app and the nextjs app. I could not get any of the available repos on github to work the way I wanted, so I decided to try and put a few of them together and after a few days of banging my head against the wall I finally managed to do it in a good way. There are still a few things I want to do, like ship a auth system and switch to tailwind, but this will take a few more days.

## 📦 Included packages

- `Prisma`
- `solito` for cross-platform navigation
- `moti` for animations (basically framer-motion but works in both expo and web)
- `twrnc` tailwind for react native
- `Expo` SDK 44
- `Next.js` 12
- `tRPC` 9
- `React Navigation` 6
-  Email/Password authentication pre-configured

## 🗂 Folder layout

- `apps` entry points for each app

  - `expo`
  - `next`

- `packages` shared packages across apps
  - `app` you'll be importing most files from `app/`
    - `features` (don't use a `screens` folder. organize by feature.)
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)
    - `navigation` Next.js has a `pages/` folder. React Native doesn't. This folder contains navigation-related code for RN. You may use it for any navigation code, such as custom links.
  - `api` your trpc api with your routes
  - `db` your prisma db with a pre-populated sqlite file
  - `config` your environment configs

You can add other folders inside of `packages/` if you know what you're doing and have a good reason to.

## 🏁 Start the app

- Install dependencies: `yarn`

- Run `yarn dev` for local development
- It will run prisma studio ([localhost:5555](localhost:5555)), expo (open in iOS simulator by default) and nextjs ([localhost:3000](localhost:3000))
- You can access the nextjs app at: `localhost:4000`

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

## 🎙 Credits

This setup is heavily inspired on a few projects:

- [create-t3-app](https://github.com/t3-oss/create-t3-app)
- [create-solito-app](https://github.com/nandorojo/solito/tree/master/example-monorepos/blank)
- [zART-Stack](https://github.com/trpc/zart)
