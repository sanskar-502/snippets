# Deploying to Render

This guide will walk you through deploying your Next.js application with a PostgreSQL database on Render.

## Prerequisites

- A [Render](https://render.com) account
- Your code pushed to a Git repository (GitHub, GitLab, etc.)

## Option 1: Manual Deployment

### Step 1: Create a PostgreSQL Database

1. Log in to your Render dashboard
2. Click on "New" and select "PostgreSQL"
3. Configure your database:
   - Name: `snippets-db` (or your preferred name)
   - Database: `snippets`
   - User: Leave as default
   - Region: Choose the closest to your users
   - PostgreSQL Version: 15 (recommended)
4. Click "Create Database"
5. Once created, note the "Internal Database URL" - you'll need this for your web service

### Step 2: Create a Web Service

1. From your Render dashboard, click "New" and select "Web Service"
2. Connect your Git repository
3. Configure the service:
   - Name: `snippets` (or your preferred name)
   - Environment: Node
   - Region: Choose the same region as your database
   - Branch: `main` (or your deployment branch)
   - Build Command: `npm install && npx prisma generate && npm run build`
   - Start Command: `npm start`
   - Instance Type: Free (or paid tier for production)

### Step 3: Set Environment Variables

1. In your web service settings, go to the "Environment" tab
2. Add the following environment variables:
   - `DATABASE_URL`: Copy the Internal Database URL from your PostgreSQL service
   - `NEXTAUTH_URL`: Your Render deployment URL (e.g., https://snippets.onrender.com)
   - `NEXTAUTH_SECRET`: Generate a secure random string (use `openssl rand -base64 32` in terminal)
   - Add any other environment variables your application needs

### Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Once deployment is complete, you can access your application at the provided URL

## Option 2: Using Render Blueprint (render.yaml)

This repository includes a `render.yaml` file that defines both the web service and database.

1. Fork or clone this repository to your GitHub account
2. In your Render dashboard, click "New" and select "Blueprint"
3. Connect your repository
4. Render will detect the `render.yaml` file and configure the services automatically
5. Review the configuration and click "Apply"
6. Add any required environment variables not defined in the YAML file
7. Render will create and deploy all services

## Post-Deployment

### Database Migrations

After deployment, you may need to run database migrations:

1. Go to your web service in the Render dashboard
2. Click on "Shell"
3. Run: `npx prisma migrate deploy`

### Troubleshooting

If you encounter issues:

1. Check the logs in your Render dashboard
2. Verify all environment variables are set correctly
3. Ensure your database connection is working
4. Check that the Prisma client is generated correctly

## Updating Your Deployment

Render automatically deploys when you push changes to your repository. For manual deployments:

1. Go to your web service in the Render dashboard
2. Click "Manual Deploy" and select "Deploy latest commit" 