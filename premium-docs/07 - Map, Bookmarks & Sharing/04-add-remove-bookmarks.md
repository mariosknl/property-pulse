# Add & Remove Bookmarks

Open the `components/BookmarkButton.jsx` file. We need to make this hit an API and add the property to the users bookmarks or remove it if it is already there. We already have a field in the model for bookmarks. So that is all set.

## API Route

Let's create the API route to handle the add and remove bookmark functionality.

Create a file at `app/api/bookmarks/route.js` and add the following code:

```jsx
import connectDB from '@/config/database';
import User from '@/models/User';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find the user by their session ID
    const user = await User.findOne({ _id: userId });

    // Check if the property is already bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      // If already bookmarked, remove it from bookmarks
      user.bookmarks.pull(propertyId);
      message = 'Bookmark removed successfully';
      isBookmarked = false;
    } else {
      // If not bookmarked, add it to bookmarks
      user.bookmarks.push(propertyId);
      message = 'Bookmark added successfully';
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
```

I added the following line:

```jsx
export const dynamic = 'force-dynamic';
```

This is to force the route to be dynamic. This is because we are using the `getSessionUser` function to get the user from the session. This function is only available in dynamic routes. I tried to deploy without this and it failed because it was not a dynamic route. So there will be a few routes where we add this line. You can read more about it [here](https://vercel.com/docs/serverless-functions/dynamic-routes).

We are getting the `propertyId` from the request body. Then we are getting the current user from the session. Then we are checking if the property is already bookmarked. If it is, then we are removing it from the bookmarks array. If it is not, then we are adding it to the bookmarks array. Then we are saving the user with the bookmark or without the bookmark. We also set a message and change the value of `isBookmarked` based on th action that was taken.

Then we save the data and send a response with the message, bookmark status and a status of 200.

## Button Component

Now we can add the click handler and request to the API.

Let's start by importing `useState`, `useEffect`, `useSession` and `toast` from `react-toastify` so we can show a success message.

```jsx
'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
```

Add the `isBookmarked` state variable and get the user if there is one:

```jsx
const { data: session } = useSession();
const userId = session?.user?.id;
const [isBookmarked, setIsBookmarked] = useState(false);
```

We set the default to `false` for now, but later we will check if the property is bookmarked or not on page load, so the default will be `null`.

Now we want to make a request to the endpoint of `POST /api/bookmarks` the current property. The property is being passed into the component, so we already have that data.

Lets create a function called `handleClick` that will make the request to the API.

```jsx
const handleClick = async () => {
  if (!userId) {
    toast.error('You need to sign in to bookmark a property');
    return;
  }

  try {
    const res = await fetch(`/api/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ propertyId: property._id }),
    });

    if (res.status === 200) {
      const data = await res.json();
      toast.success(data.message);
      setIsBookmarked(data.isBookmarked);
    }
  } catch (error) {
    console.error(error);
    toast.error('Something went wrong');
  }
};
```

We first check for a user. If there isn't one, we show a toast message. If there is, then we make the request and passing the id of the property. If successful, then we are showing a success message. If there is an error, then we are showing a generic error message.

Add the handleClick function to the button:

```jsx
 <button
      onClick={handleClick}
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
    >
```

Now if you click the button while logged in, you should be able to toggle the bookmark on and off. You can check the database to see that the property is being added and removed from the bookmarks array. You can also check the state of the button by looking at the `isBookmarked` state variable in the React Dev Tools.

In the next lesson, we will change the look of the button based on whether or not the property is bookmarked.
