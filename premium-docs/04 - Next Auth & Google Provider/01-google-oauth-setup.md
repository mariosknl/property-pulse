# Next Auth Configuration

We are now going to get started with authentication. We will be using [Next Auth](https://next-auth.js.org/) for authentication. Next Auth is a complete open source authentication solution for Next.js applications. It is easy to setup and supports many different authentication providers. We're going to to be using the Google authentication provider for this project. So you will have to create a Google project and get the client id and client secret. You can use this [Next Auth documentation page](https://next-auth.js.org/providers/google) as a supplement to this lesson.

## Authentication Flow

I just want to briefly explain the authentication flow that we will be using. When a user signs in, Next Auth will create a session for the user. The session will contain the user's information. We can access the session on both the client and the server, wether that is a React server component or an API route.

You have to be careful when it comes to using the session for things like authorization to edit or delete a property. You don't want to trust the session on the client because it can be manipulated. You should always check the session on the server. We will be using the session on the server to check if a user is authenticated and to get the user's information. It is a bit more difficult to access the session info on the server, but I will take you through step by step.

## Create a Google Project

Before we do anything, we need to create a Google project and get the client id and client secret.

Go to [Google Cloud Console](https://console.cloud.google.com/) and create a new project. You can name it whatever you want. I named mine `propertypulse`. Once the project is created, be sure that it is selected in the project dropdown in the top left corner.

Click on `APIs & Services` and then in the left sidebar click on `OAuth consent screen` and then click `Create`.

Give it an app name. I named mine `Property Pulse`. Select your email address for the `User support email`. Also, add your email under `Developer Contact Info` Then click `Save and Continue`.

Now click on `Add or Remove Scopes` and add the following scopes:

- `./auth/userinfo.email`
- `./auth/userinfo.profile`

Then click `Save and Continue`.

For `Test Users` add the gmail account that you want to use to test the authentication. Then click `Save and Continue`.

Click on `Back to Dashboard` and then click on `Credentials` in the left sidebar. Then click on `Create Credentials` and select `OAuth client ID`.

Choose `Web application` for the application type. Give it a name. I named mine `Property Pulse`. Under `Authorized JavaScript origins` add `http://localhost:3000`. Under `Authorized redirect URIs` add `http://localhost:3000/api/auth/callback/google`. Then click `Create`.

Copy your `Client ID` and `Client Secret` and add them to your `.env` file like this:

```bash
GOOGLE_CLIENT_ID=167153388710-7e1m8ltjehsmgtdfauddssdfsdfsdf5ogc29.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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9GH
```

Do not use these values (they are not real). Use your own values.

