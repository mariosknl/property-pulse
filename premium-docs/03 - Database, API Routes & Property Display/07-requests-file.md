# Create a Requests File

Instead of having the `fetchRequests` function defined twice in both the properties page and the homepage, let's create a file that we can import into both pages. We also don't want to have the domain `http://localhost:3000` hardcoded in the function. We can use an environment variable for that.

Create a new file in `utils/requests.js` and cut the function from `app/properties/page.jsx` and paste it into the new file. Then export the function.

```js
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

export { fetchProperties };
```

Now bring it into the `app/properties/page.jsx` file.

```jsx
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/requests';

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

Do the same with the homepage.

```jsx
import Hero from '../components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/requests';

const HomePage = async () => {
  const properties = await fetchProperties();

  const randomProperties = properties
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
            {randomProperties.map((property, index) => (
              <PropertyCard property={property} key={index} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
```

## Environment variable

When making a request from the client in a `useEffect` hook, we don't need to worry about the domain because the request will be made from the same domain as the application. However, when making a request from the server, we need to specify the domain. We can use an environment variable to do this.

Open your `.env` file and add the following:

```
NEXT_PUBLIC_API_DOMAIN = http://localhost:3000
```

Then update the `fetchProperties` function to use the environment variable. We also want to handle the case when the domain is not available yet. This is because, when we deploy the application, the domain will not be available until after the deployment. So we will just return an empty array in that case.

```js
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all properties
async function fetchProperties() {
  try {
    // Handle the case when the domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export { fetchProperties };
```

In the next section, we will create a new page to display a single property.
