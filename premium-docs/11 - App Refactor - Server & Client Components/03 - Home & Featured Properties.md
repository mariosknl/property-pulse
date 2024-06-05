# Home & Featured Properties

Right now we are fetching the properties from the API. We can directly query the database for the properties and pass them to the components. This will make the app faster and more efficient.

## Home Properties

For the home properties, we can do the same thing. Open `app/components/HomeProperties.jsx`. We can directly query the database here and pass the properties to the component.

```js
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const HomeProperties = async () => {
  await connectDB();

  // Get the 3 latest properties
  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
            Recent Properties
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {recentProperties.length === 0 ? (
              <p>No Properties Found</p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className='m-auto max-w-lg my-10 px-6'>
        <Link
          href='/properties'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};
export default HomeProperties;
```

## Featured Properties

We can directly query the database for the featured properties as well. Open `app/components/FeaturedProperties.jsx`.

```js
import connectDB from '@/config/database';
import Property from '@/models/Property';

const FeaturedProperties = async () => {
  await connectDB();

  const properties = await Property.find({
    is_featured: true,
  }).lean();

  return properties.length > 0 ? (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
          Featured Properties
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {properties.map((property) => (
            <FeaturedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  ) : null;
};
export default FeaturedProperties;
```

The `lean()` method is used to return plain JavaScript objects instead of Mongoose documents. This makes the data easier to work with and also improves performance.

That does it for the fetching of properties. We can now delete the following:

- The GET request handler in `app/pages/api/properties/route.js`
- The `fetchProperties` function in `utils/fetchRequests.js`. Also the export.
- The entire `app/pages/api/properties/featured` directory
