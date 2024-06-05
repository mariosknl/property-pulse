# Fetching Properties - Server Component

In this lesson, I want to fetch the properties without the use of an API route. Since this is a server component, we can use the url search parameters here to query our database directly and then pass the properties to our Properties component. This then means the Properties component can be rendered server side and no longer needs to make a fetch reqeust to an API route handler.

Let's start by bringing in the model and the database connection to our server component.

Open `app/properties/page.jsx` and add the following code:

```js
import Property from '@/models/Property';
import connectDB from '@/config/database';
```

Then we can connect to the database directly in the function and take in the search params as a prop:

```js
const PropertiesPage = async ({ searchParams: { pageSize = 6, page = 1 } }) => {
  await connectDB();

  const skip = (page - 1) * pageSize;

  const total = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(pageSize);

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      <Properties
        properties={properties}
        total={total}
        page={parseInt(page)}
        pageSize={parseInt(pageSize)}
      />
    </>
  );
};
export default PropertiesPage;
```

Now you will see a message like this:

```
Warning: Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.
```

We are going to change the `components/Properties` component to a server component. Open `app/properties/components/Properties.jsx`.

We can remove the `use client` to change it to a server component. We also no longer need to use any `useState` or `useEffect` hooks here. We can just use the properties that are passed in as props.

```js
import PropertyCard from '@/components/PropertyCard';
import Pagination from '@/components/Pagination';

const Properties = ({ properties, total, page, pageSize }) => {
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <Pagination page={page} pageSize={pageSize} totalItems={total} />
      </div>
    </section>
  );
};
export default Properties;
```

So we have made this component much more simple.

The issue that we have now is that we are embedding the Pagination component and using an event handler (`onClick`) in a server component. We could change to a client or we could use **Next/Link** to navigate, which is what I want to do. Let's change the Pagination component to use Next/Link.

Open `app/components/Pagination.jsx` and change the `Pagination` component to use Next/Link.

```js
import Link from 'next/link';

const Pagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className='container mx-auto flex justify-center items-center my-8'>
      {page > 1 ? (
        <Link
          className='mr-2 px-2 py-1 border border-gray-300 rounded'
          href={`/properties?page=${page - 1}`}
        >
          Previous
        </Link>
      ) : null}
      <span className='mx-2'>
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          className='ml-2 px-2 py-1 border border-gray-300 rounded'
          href={`/properties?page=${page + 1}`}
        >
          Next
        </Link>
      ) : null}
    </section>
  );
};
export default Pagination;
```

Now everything should be cleaned up as far as the properties page goes.

We can now move on to the home page and the featured properties.
