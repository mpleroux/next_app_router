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

### Ch. 2: CSS Styling

Associate CSS files with Tailwind in workspace settings:

```json
  "settings": {
    "files.associations": {
      "*.css": "tailwindcss",
    },
  }
```

### Ch. 6: Setting Up Your Database

#### Connect Vercel and GitHub

Vercel:

- Create free account
- Account Settings > Authentication > Sign-in Methods > GitHub -> Connect > (authorize GitHub)
- Vercel Dashboard > Import Project > Import Git Repository

By connecting your GitHub repository, whenever you push changes to your main branch, Vercel will automatically redeploy your application with no configuration needed.

- Select a Git Namespace > Add GitHub Account > (Install Vercel app)
- (repositories should appear in list after installation)

#### New project

- Dashboard > Projects (left sidebar) > Add New... > Project
- Let's build something new -> Import Git Repository > (select repository `next-app-router`) -> Import button
- (review Importing from GitHub, Project Name, Application Preset)
- Press "Deploy" button
- Should say "Congratulations! You just deployed a new project"
- Press "Continue to Dashboard" button

#### Install Neon integration

Project Dashboard > Storage (left sidebar) > Neon > Create:

- Create new Neon account
- Installation Plans > Free

#### Create database

- Install Integration:
    - Configuration and Plan:
        - Installation Plans: Free
        - Press "Continue" button
    - Confirmation:
        - Resource name: `next-app-router-db`
        - Press "Create" button
    - Database Provisioning:
        - Should say "Your Neon database is ready to use. The database `next-app-router-db` has been successfully created"
        - Press "Continue" button
    - Connect a Project:
        - Make sure `next-app-router` is selected
        - Press "Connect" button
        - Should see message "Connected project `next-app-router` to database."

#### Copy secrets

- Database dashboard: Project Dashboard > Storage > (select `next-app-router-db`)
- .env.local tab > "Show secret" button > "Copy Snippet" button
- Copy file `./env.example` to `./env` and paste snippet into it
    - Keep AUTH lines, replace the rest with snippet

#### To delete

- Project:
    - Project dashboard > Settings (left sidebar) > Delete Project
- Database:
    - Database dashboard > Settings (left sidebar) > Delete Database

#### Examine database

Project dashboard > (select project) > Storage tab > (select database) > Database Dashboard > "Open in Neon" button

[Neon Console](https://console.neon.tech/) > (select database project)

- SQL Editor tab to write queries
- Tables tab to examine table structure

### Ch. 6: Seed your database

If there's an error when trying to seed the database use the Neon Console's "Tables" tab to drop all the tables. Otherwise there will be duplicate entries.

- Click the name of a table
- Click the three dots icon
- Select "Drop"

And then rerun the script by visiting [localhost:3000/seed](http://localhost:3000/seed).

### Ch. 6: Executing Queries

I found the instructions for how to modify `app/query/route.ts` unclear. Uncomment the entire file and remove the first `return Response.json()` statement in the function `GET()`. The code should look like this:

```js
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

export async function GET() {
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
```

And here's the response after visiting [localhost:3000/query](http://localhost:3000/query). There should be only one invoice entry.

```json
[
  {
    "amount": 666,
    "name": "Evil Rabbit"
  }
]
```

### Ch. 10: Adding Search and Pagination

I had enabled the Chrome extension Dark Reader on [localhost:3000](http://localhost:3000) and it caused hydration errors on two unrelated images. The error message specifically called this out.

```txt
"A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:
- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded."
```

### Ch. 12: Handling errors

I experienced an error in both `createInvoice()` and `updateInvoice()` of `/app/lib/actions.ts`:

```txt
Type '(formData: FormData) => Promise<{ message: string; }>' is not assignable to type 'string | ((formData: FormData) => void | Promise<void>) | undefined'.
  Type '(formData: FormData) => Promise<{ message: string; }>' is not assignable to type '(formData: FormData) => void | Promise<void>'.
    Type 'Promise<{ message: string; }>' is not assignable to type 'void | Promise<void>'.
      Type 'Promise<{ message: string; }>' is not assignable to type 'Promise<void>'.
        Type '{ message: string; }' is not assignable to type 'void'.
```

The form which uses `createInvoice()` in `/app/ui/invoices/create-form.tsx` expects a Promise and we're trying to return a string:

```tsx
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // We'll also log the error to the console for now
    console.log(error);
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }
```

I tried updating the types of `react` and `react-dom` by running `pnpm install @types/react@latest @types/react-dom@latest`, but that didn't resolve the problem.

I found [some discussion](https://github.com/vercel/next-learn/issues/749#issuecomment-2380860411) online with no clear solution. For now I removed the `return` statements from the `catch` blocks.

```tsx
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // We'll also log the error to the console for now
    console.log(error);
  }
```

### Ch. 13: Improving Accessibility

I experienced multiple errors with `eslint` due to compatibility issues. Some possible reasons from Claude:

```txt
"This is a compatibility issue between ESLint v10 and `eslint-plugin-react` v7.37.5. ESLint v10 changed its API, and the react plugin you have installed doesn't support it yet."

"The issue is that `eslint.config.mjs` uses the flat config format, which requires ESLint v9+. ESLint v8 doesn't support that import."
```

The solution that eventually worked required using different versions of those libraries.

- Discard any file changes you've made so far in this chapter
- Delete the entire `node_modules` folder with `rm -rf node_modules`
- Run `pnpm install` to restore the project to the way it worked at the end of the previous chapter
- Verify everything works by running the server: `pnpm dev`
- Don't follow the tutorial's instructions to install `eslint` and `eslint-config-next` with `pnpm`. Instead, manually add these lines to `package.json` and run `pnpm install`:

```json
  "devDependencies": {
    "eslint": "^9.39.4",
    "eslint-config-next": "^16.2.4",
    "eslint-plugin-react": "^7.37.5",
  },
```

After that the command `pnpm lint` should run without problems.
