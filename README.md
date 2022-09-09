This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, set environment variables in `.env`
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<RANDOM LONG STRING>
DATABASE_URL=<DATABASE_URL>
```

If you want Facebook authentication; add
```bash
FACEBOOK_ID=<GET FROM FACEBOOK>
FACEBOOK_SECRET=<GET FROM FACEBOOK>
```

If you want Apple authentication; add
```bash
APPLE_ID=<GET FROM APPLE>
APPLE_SECRET=<GET FROM APPLE>
```

If you want Google authentication; add
```bash
GOOGLE_CLIENT_ID=<GET FROM GOOGLE>
GOOGLE_CLIENT_SECRET=<GET FROM GOOGLE>
```

For more options: see https://next-auth.js.org/providers/

Then, install:

```bash
yarn install
prisma db push
prisma generate
```

... and run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction)

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
