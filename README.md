# Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Notes

### Setup

```sh
npx create-next-app@latest next_app_router --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm
```

Install the VSCode [Prettier plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

```sh
pnpm install -D prettier prettier-plugin-tailwindcss
```

Create `.prettierrc` at the root level of the project and use the correct path for your CSS file.

```json
{
  "bracketSameLine": true,
  "plugins": [
    "prettier-plugin-tailwindcss"
  ],
  "overrides": [
    {
      "files": "*.md",
      "options": {
        "parser": "markdown"
      }
    }
  ],
  "tailwindStylesheet": "./app/ui/global.css"
}
```

Enable [TypeScript plugin](https://nextjs.org/docs/app/api-reference/config/typescript#typescript-plugin) for VSCode:

Next.js includes a custom TypeScript plugin and type checker, which VSCode and other code editors can use for advanced type-checking and auto-completion.

```txt
You can enable the plugin in VS Code by:

1. Opening the command palette (Ctrl/⌘ + Shift + P)
2. Searching for "TypeScript: Select TypeScript Version"
3. Selecting "Use Workspace Version"
```

The styling issues, including an unsized right arrow SVG, are caused by an unimported stylesheet and will be addressed in [Chapter 2: CSS Styling](https://nextjs.org/learn/dashboard-app/css-styling).

I initially encountered an error about a missing `app/ui/fonts.ts` file. That problem is addressed in [Chapter 3: Optimizing Fonts and Images](https://nextjs.org/learn/dashboard-app/optimizing-fonts-images).
