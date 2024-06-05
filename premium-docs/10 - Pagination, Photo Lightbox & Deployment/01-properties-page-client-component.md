# Properties Page Client Component

Right now, our `app/properties/page.jsx` component it a server component. This means that we can not use React hooks or state in this component. Which we will need to do to implement pagination. Instead of making the page component a client component itself, we will create a client component that will be used by the server component.

Create a new file `components/Properties`. We are going to make this a client component and fetch the properties from the server and then display them. Copy the second `<section>` from `app/properties/page.jsx` and paste it into `components/Properties.jsx`.

It should look like this so far:

```javascript
'use client';
const Properties = () => {

  return (
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h1 className='text-2xl mb-4'>Browse Properties</h1>
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
    )
  );
};

export default Properties;
```

Now, bring in the `useState` and `useEffect` hooks from React as well as the `PropertyCard` and `Spinner` component into the `components/Properties.jsx` file. You can then delete the import from the `properties/page.jsx` file.

```javascript
'use client';
import { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
```

Add the following state to the `Properties` component:

```javascript
const [properties, setProperties] = useState([]);
const [loading, setLoading] = useState(true);
```

We want to render the `Spinner` component while the properties are being fetched. Add the following conditional rendering to the `Properties` component:

```javascript
return loading ? (
  <Spinner />
) : (
  <section className='px-4 py-6'>
    <div className='container-xl lg:container m-auto px-4 py-6'>
      <h1 className='text-2xl mb-4'>Browse Properties</h1>
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
```

Now add the `useEffect` hook to fetch the properties from the server:

```javascript
useEffect(() => {
  const fetchProperties = async () => {
    try {
      const res = await fetch(`/api/properties`);

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setProperties(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  fetchProperties();
}, []);
```

Now it should be working as it was before, except that we are now fetching the properties from the server with the `Properties` component.
