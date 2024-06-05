# Fetch Single Property & API Route

Let's create the endpoint to fetch a single property.

Create a folder called `[id]` in `app/properties/api` and create a file called `route.js` inside of it. This will be the API route for fetching a single property.

```js
import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) return new Response('Property Not Found', { status: 404 });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
```

We're using the `params` object to get the `id` from the URL. We're using the `findById` method to find the property by its ID. If the property doesn't exist, we return a 404 response. If there's an error, we return a 500 response.

Visit `http://localhost:3000/api/properties/A_VALID_ID` in your browser and you should see the property data.

## Fetch Single Property

Now that we have the api route, let's fetch it from our app. Your "details" button should go to the property page with the property ID in the URL. For example, `http://localhost:3000/properties/65a7d19b47edb8af2911f036`.

Let's open the `app/properties/requests.js` file and add a function to fetch a single property:

```js
// Fetch a single property
async function fetchProperty(id) {
  try {
    // Handle the case when the domain is not available yet
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}
```

We are making the request to the API route we created earlier. We are passing the `id` as an argument to the function. We are using the `apiDomain` environment variable to get the domain. We are returning `null` if the domain is not available yet. We are returning `null` if there's an error.

Be sure to export it:

```js
export { fetchProperties, fetchProperty };
```

Lets go to `app/properties/[id]/page.jsx` and add the following:

```jsx
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProperty } from '@/app/properties/requests';

const PropertyPage = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
    if (!id) return;
    try {
      const property = await fetchProperty(id);
      setProperty(property);
    } catch (error) {
      console.error('Error fetching property data:', error);
    } finally {
      setLoading(false); 
    }
  };

  if (property === null) {
    fetchPropertyData();
  }
  
  }, [id, property]);

  return <div>PropertyPage</div>;
};

export default PropertyPage;
```

Since we need to use a hook to get the id in the url, we need to tell Next.js that this is a client side file. We do this by adding `'use client';` to the top of the file.

We bring in both the `useEffect` and `useState` hooks. We're using the `useState` hook to set the `property` state to `null` and the `loading` state to `true`.

We're using the `useParams` hook to get the `id` from the URL. We're using the `fetchProperty` function to fetch the property data. We're using the `useEffect` hook to run the `fetchPropertyData` function when the component mounts.

We return if the `id` is not available and we check to see if the `property` is `null`. If it is, we run the `fetchPropertyData` function. If it's not, we set `loading` to `false`.

We're passing the `id` and `property` as a dependency so that the function runs again when these change.

We are then setting the `property` state to the property data, setting `loading` to `false` and logging it to the console.

You should see the property data in the console.

Next we will take that data and display it on the page.
