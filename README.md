# LovelySnips

A modern code snippet management application built with Next.js, Prisma, and PostgreSQL. Store, organize, and share your code snippets with ease.

## Features

- **User Authentication**: Secure login and registration system
- **Code Snippet Management**: Create, view, edit, and delete code snippets
- **Syntax Highlighting**: Support for multiple programming languages
- **Public/Private Snippets**: Choose whether to make your snippets public or keep them private
- **Access Control**: Admin functionality for managing users and content
- **Monaco Editor**: Rich code editing experience

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- PostgreSQL database

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sanskar-502/snippets.git
cd snippets
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://username:password@localhost:5432/snippets?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

Replace the database connection string with your PostgreSQL credentials.

### 4. Set up the database

```bash
npx prisma migrate dev
# or
yarn prisma migrate dev
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/src/app`: Next.js application routes and pages
- `/src/components`: Reusable React components
- `/src/lib`: Utility functions and shared code
- `/src/actions`: Server actions for data operations
- `/prisma`: Database schema and migrations

## Database Schema

The application uses Prisma ORM with a PostgreSQL database. The schema includes:

- Users
- Snippets
- Authentication (accounts, sessions)
- Access codes

## Deployment

### Deploy on Render

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

Alternatively, you can use the `render.yaml` file in this repository to deploy both the web service and database together using Render's Blueprint feature.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

1. Push your code to a Git repository
2. Import the project into Vercel
3. Add the required environment variables
4. Deploy

## License

[MIT](LICENSE)
