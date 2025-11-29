# README

## Description

These are the local files I created while following the Next.js tutorial [App Router](https://nextjs.org/learn/dashboard-app). I didn't clone or fork the project repo because I wanted to create everything from scratch, or in this case, using the starter example directory.

- Starter example: [starter-example](https://github.com/vercel/next-learn/tree/main/dashboard/starter-example)

Once again I was impressed by the quality of the tutorial.

## Technologies used

- JavaScript
- React 19.1
- React DOM 19.1
- Next.js 15.3

## Project setup

Installed `pnpm` package manager globally: `npm install -g pnpm`

Deleted previous `~/Dev/next_app_router` directory and created Next.js app:

```sh
cd ~/Dev
npx create-next-app@latest next_app_router --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm
```

Install dependencies and run project with `pnpm`:

```sh
pnpm install
pnpm dev # instead of npm run dev
```

I initially encountered an error about a missing `app/ui/fonts.ts` file. That problem is addressed in [Chapter 3: Optimizing Fonts and Images](https://nextjs.org/learn/dashboard-app/optimizing-fonts-images).
