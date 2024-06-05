## Get User & Submit To Database

We need to know which user is adding the property. We can get the user from the session. There are a few ways to do this. We already saw how to use the `useSession` hook from NextAuth. However, that is made for the client. For the server, we can use the `getServerSession` function within the API route. This works a bit differently.

Go to the API route at `app/api/properties/route.js` and import the `getServerSession` function and the `authOptions` object. This is why we put that in a separate file.

```js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
```

Add the following code to the `POST` function right under where we called the `connectDB()` function:

```js
// Get session
const session = await getServerSession(authOptions);

if (!session) {
  return new Response('Unauthorized', { status: 401 });
}

// Get user ID from session
const userId = session.user.id;
```

We passed the `authOptions` object to the `getServerSession` function. Then we checked for a session and returned a 401 status code if there was no session. Then we got the user id from the session.

Now we just need to add the user id to the `propertyData` object:

```js
// ... rest of code
  seller_info: {
    name: formData.get('seller_info.name'),
    email: formData.get('seller_info.email'),
    phone: formData.get('seller_info.phone'),
  },
  owner: userId, // Add the user id
};
```

Now when you submit and log, you should see the user's id in the object.

## Utils File

We will be using the same code to get the user from the session quite a bit. So let's create a function for that. Create a new file at `/utils/getSessionUser.js` and add the following code:

```js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
```

We are doing the same thing that we did in the API route. We are just returning the user object and the user id. We are also returning null if there is no session or user.

Now we can import this function into the API route and use it instead of the code we just wrote.

```js
import { getSessionUser } from '@/utils/getSessionUser';
```

Replace the session stuff that we just wrote with the following code:

```js
const sessionUser = await getSessionUser();

if (!sessionUser || !sessionUser.userId) {
  return new Response('User ID is required', { status: 401 });
}

const { userId } = sessionUser;
```

Now submit the form and make sure the `userId` is added to the `propertyData` object as the `owner`.

you can also remove the `getServerSession` and `authOptions` imports from the API route.

## Submit To Database

Now we have our form data, we can add the property to the database. We still don't have the image upload, so for now, just comment out `images` in the `propertyData` object that we are going to submit.

Make sure that the `connectDB` function and the Property model are imported into the `app/api/properties/route.js` file:

```js
import connectDB from '@/config/database';
import Property from '@/models/Property';
```

Connect to the database in the top of the `POST` try block:

```js
await connectDB();
```

Get rid of the console log below the PropertyData object and add the following code:

```js
const newProperty = new Property(propertyData);
await newProperty.save();
```

Then we want to redirect the user to the property page. Replace the current response with the following code:

```js
return Response.redirect(
  `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
);
```

Try to add a new property and see if it works. It should get added to the database and redirect you to the property page.

The images will not show because we did not add upload functionality yet. Let's do that next.
