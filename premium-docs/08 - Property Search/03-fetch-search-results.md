# Fetch Search Results

We need to now fetch the search results from the API route and display in the search results page.

Create a new file at `app/properties/search-results/page.jsx` and add the following code:

```js
const SearchResultsPage = () => {
  return <div>SearchResultsPage</div>;
};
export default SearchResultsPage;
```

Add the following to the `app/properties/search-results/page.jsx` file to parse the query string:

```js
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get('location');
  const propertyType = searchParams.get('propertyType');

  useEffect(() => {
    console.log('location:', location);
    console.log('propertyType:', propertyType);
  }, [location, propertyType]);

  return <div>SearchResultsPage</div>;
};
export default SearchResultsPage;
```

When the page loads, you should see the `location` and `propertyType` values logged to the console.

Now let's make a request to `/api/properties/search` to get the search results.

```js
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();

  const location = searchParams.get('location');
  const propertyType = searchParams.get('propertyType');

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [location, propertyType]);

  return <div>SearchResultsPage</div>;
};
```

Our `useEffect` hook will run when the location and propertyType values change. It will make a request to the `/api/properties/search` endpoint and set the properties state with the results. If there are no location and propertyType values, the properties state will be set to an empty array and no listings will be displayed.


