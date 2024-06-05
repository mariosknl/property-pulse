# API Routes & Test Connection

Now that we have our connection file, we want to test it out. We need to create an API route to hit that will connect to the database and ultimately fetch the properties from the database.

Create a folder called `api` in the `app` folder. This is where our api routes will go. It works similar to the regular routes except instead of naming our files `page.jsx`, they are named `route.js`. For instance, we want a route at `/api/properties`. So we will create a file at `app/api/properties/route.js`.

In that file, we will import our connection file and create a handler function:

```js
export const GET = async (request) => {
  try {
    return new Response(JSON.stringify({ message: 'Hello World' }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
```

We are using the `GET` method here because we are fetching data. We will use `POST` when we are creating data, `PUT` when we are updating data, and `DELETE` when we are deleting data.

As you can see, Next.js gives us a full stack framework. We can use the `Response` object to send back a response to the client. We are sending back a JSON object with a message property. We are also setting the status code to 200 which means everything is OK. If there is an error, we will send back a 500 status code.

Go to `http://localhost:3000/api/properties` and you should see the JSON object with the message property.

## Testing the Database Connection

In order to fetch the properties, we will need to create a model. We will do that in the next lesson. For now, we just want to test our database connection.

Let's bring in our database connection file and run the `connectDB` function. We should see a message in the console that says "MongoDB connected...".

```js
import connectDB from '@/config/database';

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    return new Response(JSON.stringify({ message: 'Hello World' }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
```

If you see the console message, you are connected. If not, make sure you have the MongoDB server running and that you have the `MONGODB_URI` environment variable set.

In the next lesson, we will create our model so that we can fetch the properties from the database.
