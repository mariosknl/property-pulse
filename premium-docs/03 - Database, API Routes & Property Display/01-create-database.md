# Create a Database

So we have some properties showing from a JSON file. Now we want to store them in a database. We will use MongoDB for this. MongoDB is a NoSQL document database. It stores data in JSON-like documents. It is a very popular database for Node.js applications.

You can install MongoDB locally, however, we will use a cloud service called MongoDB Atlas. This is a cloud service that provides a free tier for developers.

Go to https://www.mongodb.com and click on the "Try Free" button. You will need to create an account. Verify your email address and then log in.

## Create and Configure a Cluster

Once you have signed up, you can create a new project and database cluster. The interface for Atlas changes pretty frequently, so it may look different at the time that you are reading this. The steps are self-explanatory though.

1. Create a new project
2. Create a new database cluster
3. Select the free/shared tier
4. Select a cloud provider (AWS) and region
5. Give your cluster a name
6. Click "Create Cluster"

It may take a few minutes for your cluster to be created.

You also want to add a user to your database. On the left side of the screen, under "Security", click on "Quick Start". Then click on "Add New Database User". Enter a username and password and click "Add User".

Then below that should be an area to add your IP address. Click on "Add IP Address" and then click on "Allow Access From Anywhere". This will allow you to connect to your database from anywhere. This is not recommended for production applications, but it is fine for development.

Once you deploy, you will have to add your server's IP address to the list of allowed IP addresses.

## Create Database

Now click on the "Browse Collections" button. You can view data from here. Obviously, there is no data yet. But this is where we can create the actual database for our cluster.

Click on "Create Database" and give it a name. We will call it "propertypulse". you can also add a collection from here. We will call it "properties". Then click "Create".

You do not have to create collections on the database level with NoSQL. You can do that from your code. But it is nice to have a collection already created.

## Get Connection String

Now we need our connection string to connect. Click on "Connect" and under "Connect Your Application" click on "Drivers". It will show you the diver for Node.js. We will install this with NPM in a little bit. For now, copy the connection string. It should look something like this:

```
mongodb+srv://<username>:<password>@freecluster.9z1lpeq.mongodb.net/?retryWrites=true&w=majority
```

There are a couple things we need to do to edit this. First, add the name of the database to the end of the string. Then replace the username and password with the ones you created earlier. It should look something like this:

```
mongodb+srv://brad:brad@freecluster.9z1lpeq.mongodb.net/propertypulse?retryWrites=true&w=majority
```

If you don't add the database name, it will create one called "test" by default.

Now, back in your application, create a new file called ".env" in the root of your project. This is where we will store our environment variables. Add the following to it:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<host>/<database>?retryWrites=true&w=majority
```

Obviously, replace the username, password, host, and database with your own.

I am also going to add a variable for the domain and the api domain/url. This will make it easier to change later if we need to. Add the following to your `.env` file:

```bash
NEXT_PUBLIC_DOMAIN = http://localhost:3000
NEXT_PUBLIC_API_DOMAIN = http://localhost:3000/api
```

## Test Environment Variable

You can check and see if the environment variable is working by adding the following to your `app/page.jsx` file within the `HomePage` component/function:

```js
console.log(process.env.MONGO_URI);
```

Then restart your server and you should see the connection string in the console. Not the browser console, the terminal. Remember, components in Next.js are rendered on the server by default, not the browser. If we add "use client", then it will render in the browser.

You can delete that console log.

Next we will connect to our database through our application.
