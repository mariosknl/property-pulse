# Profile User Listings

Let's add the user's property listings to their profile page. There are a few ways to do this depending on if you want the users properties to be public or private. If you want them to be private, then you would get the user ID from the session and then query the database for properties that belong to that user. I want this to be a public route where you can pass the user id and get their properties because this could be another feature that you could add to the site. For example, you could have a page that lists all the properties for a specific user.

## Create API Route

Create a new route file at `app/api/properties/user/[userId]/route.js` with the following contents:

```jsx
import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/user/[userId]
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const userId = params.userId;

    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }

    const properties = await Property.find({ owner: userId });

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
```

We are using the `params` object to get the `userId` from the URL. We then use the `userId` to query the database for properties that belong to that user.

## Fetching User Properties

Now we can fetch the user property listings from the `app/profile/page.jsx` page.

Let's import the `useState` and `useEffect` hooks as well as the `Spinner` component:

```jsx
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
```

Then initialize the `properties` and `loading` state:

```jsx
const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  // Add this
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  // ...
```

Let's fetch the properties when the component mounts. Add the following `useEffect` hook:

```jsx
useEffect(() => {
  // Fetch user properties from API
  const fetchUserProperties = async (userId) => {
    if (!userId) {
      return;
    }

    try {
      const res = await fetch(`/api/properties/user/${userId}`, {
        method: 'GET',
      });

      if (res.status === 200) {
        const data = await res.json();
        setProperties(data);
        setLoading(false);
      }
    } catch (error) {
      // Handle fetch errors
      console.error(error);
    }
  };

  // Fetch user properties when session data is available
  if (session?.user?.id) {
    fetchUserProperties(session.user.id);
  }
}, [session]);
```

It gets passed in a userId field and then makes a GET request to the API. If the request is successful, it sets the properties state and sets the loading state to false.

You can check the network tab in the devtools to see the request and response and also check the React devtools to see the state.

## Displaying User Properties

Under the `<h2 className='text-xl font-semibold mb-4'>Your Listings</h2>` add the following:

```jsx
{
  !loading && properties.length === 0 && <p>You have no property listings.</p>;
}
```

Under that are two `div` elements that contain the property listings. We want to replace those with the following:

```jsx
{
  loading ? (
    <Spinner loading={loading} />
  ) : (
    properties.map((property) => (
      <div className='mb-10' key={property._id}>
        <Link href={`/properties/${property._id}`}>
          <Image
            className='h-32 w-full rounded-md object-cover'
            src={property.images[0]}
            alt={property.name}
            width={500}
            height={100}
            priority={true}
          />
        </Link>
        <div className='mt-2'>
          <p className='text-lg font-semibold'>{property.name}</p>
          <p className='text-gray-600'>
            Address: {property.location.street} {property.location.city}
          </p>
        </div>
        <div className='mt-2'>
          <Link
            href={`/properties/${property._id}/edit`}
            className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
          >
            Edit
          </Link>
          <button
            className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
            type='button'
          >
            Delete
          </button>
        </div>
      </div>
    ))
  );
}
```

You should now see your listings on the profile page.

## Redirect Guests

If the user is not logged in, they should be redirected if they view the profile page. We can add the route to the middleware file. Open the `middleware.js` file and `/profile` route:

```jsx
export const config = {
  matcher: ['/properties/add', '/profile'],
};
```
