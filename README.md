# Telegram Mini Apps React Boilerplate

This boilerplate demonstrates how developers can implement a single-page application on the Telegram
Mini Apps platform using the following technologies:

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TON Connect](https://docs.ton.org/develop/dapps/ton-connect/overview)
- [@tma.js SDK](https://docs.telegram-mini-apps.com/packages/tma-js-sdk)
- [Vite](https://vitejs.dev/)

> This boilerplate was created using [pnpm](https://pnpm.io/). Therefore, it is required to use
> it for this project as well.

## First Start

If you have just cloned this template, you should install the project dependencies using the
command:

```Bash
pnpm i
```

## Scripts

This project contains the following scripts:

- `dev`. Runs the application in development mode.
- `build`. Builds the application for production.
- `lint`. Runs [eslint](https://eslint.org/) to ensure the code quality meets the required
  standards.
- `deploy`. Deploys the application to GitHub Pages.

To run a script, use the `pnpm run` command:

```Bash
pnpm run {script}
# Example: pnpm run build
```

## TON Connect

This boilerplate uses the [TON Connect](https://docs.ton.org/develop/dapps/ton-connect/overview)
project to showcase how developers could integrate TON cryptocurrency-related functionality.

The TON Connect manifest used in this boilerplate is located in the `public` folder along with all
publicly available static files. Don't forget
to [configure](https://docs.ton.org/develop/dapps/ton-connect/manifest) this file according to your
project information.

## Deploying Application

This boilerplate uses GitHub Pages as the way to host the application externally. Before deploying
your application, ensure that you have done the following:

1. Replaced the `homepage` value in `package.json`. The GitHub Pages deploy tool uses this value to
   determine the related project.
2. Replaced the `base` value in `vite.config.ts` and have set it to the name of your GitHub
   repository. Vite will use this value when creating paths to static assets.

For instance, if your GitHub username is `telegram-mini-apps` and the repository name
is `is-awesome`, the value in the `homepage` field should be the following:

```
https://telegram-mini-apps.github.io/is-awesome
```

And `vite.config.ts` should have this content:

```ts
export default defineConfig({
  base: '/is-awesome/',
  // ...
});
```

### Running

Before deploying the application, make sure that you've built it and going to deploy the fresh
static files:

```bash
pnpm run build
```

Then, run the deployment process, using the `deploy` script:

```Bash
pnpm run deploy
```

After the deployment completed successfully, visit the page with data according to your
username and repository name. Here is the page link example using the data mentioned above:

```
https://telegram-mini-apps.github.io/is-awesome
```