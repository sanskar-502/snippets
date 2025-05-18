This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy on Render

To deploy this application on Render:

1. Create a Render account at [render.com](https://render.com)
2. Connect your GitHub repository to Render
3. Create a new Web Service and select your repository
4. Configure your service:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Create a PostgreSQL database in Render
6. Add the following environment variables:
   - `DATABASE_URL`: This will be automatically provided by Render if you link the database
   - `NEXTAUTH_URL`: Your Render deployment URL (e.g., https://your-app-name.onrender.com)
   - `NEXTAUTH_SECRET`: Generate a secure random string
   - Any other environment variables your app needs

Alternatively, you can use the `render.yaml` file in this repository to deploy both the web service and database together using Render's Blueprint feature.
