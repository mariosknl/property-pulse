# Fetching Properties from Database

Now let's go back to our api route at `app/api/properties/route.js` and fetch the properties from the database.

```js
import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
```

Now visit the route at `http://localhost:3000/api/properties` and you should see the properties in the database.

## Display Properties

Now, let's display the properties on the properties page. There are a couple of ways to do this. We could fetch the properties on the server or we can make it a client component and use the `useEffect` hook to fetch the properties.

I want to stick with the server. In prior versions of Next.js, we had to use methods such as `getInitialProps` or `getServerSideProps` to fetch data on the server. Now, we can simply create a function in our file above the component and return the data.

Go to `app/properties/page.jsx` and add the following function above the `PropertiesPage` function. You can also remove the import of the JSON file. We no longer need that.

```jsx
import PropertyCard from '@/components/PropertyCard';

async function fetchProperties() {
  try {
    const res = await fetch('http://localhost:3000/api/properties', { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
```

We are making the request to the API route we created earlier. I set the `cache: 'no-store'` option here so that we see the results right away. If you are fetching from the server and you don't want the results cached you have to do this.

Now in the component, make it `async` and then just create a new `properties` variable and set it to the return value of the `fetchProperties` function.

```jsx
const PropertiesPage = async () => {
  const properties = await fetchProperties();

  // ...
};
```

You should now see the properties on the page coming from the database.

### Order by Date

I want the most recent properties to show up first. To do this, we can use the `sort` method on the array and pass in a function that compares the dates. Here is the final code for the page:

```jsx
const PropertiesPage = async () => {
  const properties = await fetchProperties();

  // Sort the properties by create date
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
  );
};
```

## Homepage

Let's do the same with the homepage. I am going to randomize the properties and only show 3 of them.

Add the following to `app/page.jsx`:

```jsx
import Hero from '../components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';

async function fetchProperties() {
  try {
    const res = await fetch('http://localhost:3000/api/properties');

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

const HomePage = async () => {
  const properties = await fetchProperties();

  const recentProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <Hero />
      <InfoBoxes />
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
            Recent Properties
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {recentProperties.map((property, index) => (
              <PropertyCard property={property} key={index} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default HomePage;
```

Now the properties from the database should show on both the home and properties pages.
