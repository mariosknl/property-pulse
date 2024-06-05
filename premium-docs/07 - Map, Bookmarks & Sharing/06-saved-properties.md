# Saved Properties Page

Now we need a page to display all the saved properties for the current user. Create a file at `app/properties/saved/page.jsx` and add the following code:

```jsx
const SavedPropertiesPage = () => {
  return <div>SavedPropertiesPage</div>;
};
export default SavedPropertiesPage;
```

Now if you go to `http://localhost:3000/properties/saved`, you should see the text `SavedPropertiesPage`.

Your Navbar should already have the link. If not, add it.

## API Route

Let's create the API route first. Open the `app/api/bookmarks/route.js` file and add the following route handler:

```jsx
// GET /api/bookmarks
export const GET = async (request) => {
  try {
    await connectDB();

    const { userId } = await getSessionUser();

    // Find the user by their session ID
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    // Retrieve the user's bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), {
      status: 200,
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
```

This will get the current user's bookmarks and return them as JSON.

## Page

Now for the page, let's make it a client component. The reason for this is if we need to get the session on the server, as we do, then we need to send a headers() function with the request. It's kind of a headache, so I'm just going to make it a client component. More about the headers issue [here](https://nextjs.org/docs/app/api-reference/functions/headers).

We also want the `useState` and `useEffect` hooks, so let's import those as well as the `PropertyCard`, `toast` and `Spinner` component.

```jsx
'use client';
import { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
```

Let's add our properties and loading state:

```jsx
const [properties, setProperties] = useState([]);
const [loading, setLoading] = useState(true);
```

## Fetch Saved Properties

Now we can add the `useEffect` hook to fetch the saved properties.

```jsx
async function fetchSavedProperties() {
      try {
        const res = await fetch(`/api/bookmarks`, {
          method: 'GET',
        });

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
          // Sort the properties by create date
          properties.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else {
          console.error(`Failed to fetch saved properties: ${res.statusText}`);
          toast.error('Failed to fetch saved properties');
        }
      } catch (error) {
        console.error(
          `An error occurred while fetching saved properties: ${error}`
        );
        toast.error('An error occurred while fetching saved properties');
      } finally {
        setLoading(false);
      }
    }

    fetchSavedProperties();
  }, []);
```

We are fetching the saved properties from the API route we just created. If the response is successful, we set the properties state and sort them by create date. If not, we log an error and show a toast notification.

The rest is pretty similar to the other properties pages. We will show the `PropertyCard` component for each property and show a message if there are no saved properties.

```jsx
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Properties</h1>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property, index) => (
              <PropertyCard property={property} key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
```

Now you should see all of your saved properties on the saved properties page.
