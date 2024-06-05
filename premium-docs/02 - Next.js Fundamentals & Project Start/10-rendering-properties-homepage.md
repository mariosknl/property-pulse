# Rendering Properties On The Homepage

Now that we have our properties page looking good, let's move on to the homepage. We want to display the properties on the homepage as well. We will use the same `PropertyCard` component that we created in the last section, however, we want to limit it to 3 properties. We will also want to randomize the properties so that we don't always see the same ones.

In addition, we will also have featured properties that will have a slightly different style. We will create a `FeaturedPropertyCard` component for that.

Let's start by importing the data and the PropertyCard component into the `app/page.jsx file`:

```js
import properties from '@/properties.json';
import PropertyCard from '@/components/PropertyCard';
```

Now, show the listings:

```js
const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <section class='px-4 py-6'>
        <div class='container-xl lg:container m-auto'>
          <h2 class='text-3xl font-bold text-blue-500 mb-6 text-center'>
            Recent Properties
          </h2>
          <div class='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property, index) => (
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

This will show all of the properties. Let's limit it to 3 and randomize the order:

```js
import properties from '@/properties.json';

const HomePage = () => {
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

Let's also add a button/link that goes to all properties. Import the `Link` component from `next/link`:

```js
import Link from 'next/link';
```

Then add the section under the existing section:

```js
<section className='m-auto max-w-lg my-10 px-6'>
  <Link
    href='/properties'
    className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
  >
    View All Properties
  </Link>
</section>
```
