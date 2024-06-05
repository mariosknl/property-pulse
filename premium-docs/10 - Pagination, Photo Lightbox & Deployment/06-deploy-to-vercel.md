# Deploy To Vercel

Now that our application is ready, we can deploy it to Vercel. Vercel is a cloud platform for static sites and serverless functions. It is a great platform for deploying Next.js applications.

## MongoDB Atlas Access

We need to make sure that we can access the database from the Vercel deployment. We can do this by adding the IP address of the Vercel deployment to the IP access list in MongoDB Atlas. You may not get the IP address of the Vercel deployment until after you deploy it, so for now, go into the MongoDB Atlas dashboard and go to `Network Access`. Click on `Add IP Address` and then `Allow Access from Anywhere`. This will allow access from any IP address. Once you have the IP address of the Vercel deployment, you can add it to the IP access list.

## Push to GitHub

The first thing that you need to do is push your code to GitHub. If you haven't done that yet, you can do it by creating a repo at github.com and running the following commands:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <remote_repository_URL>
git push -u origin main
```

Once you have it on GitHub, you can deploy it to Vercel. Just log in to Vercel (using Github credentials) and click on the "Import Project" button.

## Environment Variables

We need to add our environment variables to Vercel. You should see an area on the form to do this. Add the variables and their values. You can either manually enter them or open the `.env` file and copy the entire thins and paste it into the first input and it will fill all the variables for you.

<img src="/images/vercel1.png" />

Just use the local domain for now and once it is deployed, you can update the domain variables.

Click `Deploy` and it will take a few minutes to deploy.

Once it is deployed, you can click on the link to see your application. You probably will not see the listings on the homepage because you need to add the domain name to the environment variables. So take note of the domain.

Now go to `Settings` and then `Environment Variables`

Update the following environment variables:

- NEXT_PUBLIC_DOMAIN = https://yourdomain.com
- NEXT_PUBLIC_API_DOMAIN = https://yourdomain.com/api
- NEXTAUTH_URL = https://yourdomain.com
- NEXTAUTH_URL_INTERNAL = https://yourdomain.com

Once changed, you have to redeploy the application. Click on `Deployments` and then click on your deployment. Then click on `Redeploy`. Now it should use the correct domain and the homepage should show the listings.

## Add Domain to Google Console

You will also need to add the domain to the Google Console in order to use authentication. Go to the Google Console at https://console.cloud.google.com and click on 'Credentials'. Then click on the credentials that you already created under `OAuth 2.0 Client IDs`. Add the domain to the `Authorized JavaScript origins` and the `Authorized redirect URIs`.

<img src="/images/googleconsole.png" />

Now try signing in and it should work.

You can proceed to test parts of the website and make sure everything is working as expected.

For production, you want to take the Google OAuth out of development mode. Go to the Google Console and click on `OAuth consent screen`. Then click on `Publish App`.

That's it! You have created a pretty cool application with Next.js. Congratulations! You can now show it off to the world.
