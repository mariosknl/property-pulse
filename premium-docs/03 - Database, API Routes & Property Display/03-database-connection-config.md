# Database Connection Config

Now that we have our MongoDB database created, we need to connect to it from our application.

## Install Dependencies

We have a couple things to install. First, we need to install the MongoDB driver for Node.js. We also need to install "Mongoose", which is an ORM (ODM) for MongoDB. It makes it easier to work with MongoDB from Node.js.

Open your terminal and type the following:

```bash
npm install mongodb mongoose
```

## Config File

Create a folder in the root called `config` and create a file called `database.js` inside of it. This is where we will put our database connection code.

```js
import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  // If the database is already connected, don't connect again
  if (connected) {
    console.log('MongoDB is already connected...');
    return;
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    connected = true;

    console.log('MongoDB connected...');
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
```

This code is pretty self-explanatory. We are importing Mongoose and creating a variable called `connected` that will keep track of whether or not we are connected to the database. Then we create an `async` function called `connectDB` that will connect to the database.

We set `strictQuery` to `true` so that Mongoose will ensure that only the fields that are specified in our schema will be saved in the database

Then we check to see if we are already connected. If we are, we just log a message and return. If we are not, we connect to the database using the `MONGODB_URI` environment variable that we created earlier.

## Database Workflow

The way that our project will work is we will create our own API routes, which run on the server. When we need to interact with the database to fetch data or authenticate a user, we will do that from the API routes. So the database will only be accessed from the server when we hit an API route.

In the next lesson, we will create our first API route and validate our database connection.
