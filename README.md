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
your application, ensure that you have replaced the `homepage` value in `package.json`. The GitHub
Pages deploy tool uses this value to determine the related project.

If your GitHub username is `vladislav` and the repository name is `store`, the value in
the `homepage` field should be the following:

```
https://vladislav.github.io/store
```

To run the deployment, use the `deploy` script:

```Bash
pnpm run deploy
```

The package manager will firstly run the `predeploy` script building
your app, and then run the deployment itself.