# Single Property Pages

We are going to set the single property page to a server component. We will connect to the database from here and query the property data.

We do have some client components such as the share and bookmark buttons and if we want to pass the property data to these client components we need to pass as a plain objects. So we will convert the server data to plain objects using a utility function.

In the `utils` folder create a new file `convertToObject.js` and add the following code:

```javascript
/**
 * Converts a Mongoose lean document into a serializable plain JavaScript object.
 *
 * @param {Object} leanDocument - The Mongoose lean document to be converted.
 * @returns {Object} A plain JavaScript object that is a serializable representation of the input document.
 */

export function convertToSerializeableObject(leanDocument) {
  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key].toJSON && leanDocument[key].toString)
      leanDocument[key] = leanDocument[key].toString();
  }
  return leanDocument;
}
```

This converts the Mongoose lean document into a serializable plain JavaScript object.

Let's bring it into the `app/properties/[id]/page.jsx` file:

```javascript
import { convertToSerializeableObject } from '@/utils/convertToObject';
```

We can also completely remove the useState, useEffect, use client, Spinner and many other things. We want to bring in the Property model and the connectDB() function.

Here is the code for the `app/properties/[id]/page.jsx` file:

```javascript
import Link from 'next/link';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyImages from '@/components/PropertyImages';
import BookmarkButton from '@/components/BookmarkButton';
import PropertyContactForm from '@/components/PropertyContactForm';
import ShareButtons from '@/components/ShareButtons';
import { FaArrowLeft } from 'react-icons/fa';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';

const PropertyPage = async ({ params }) => {
  // NOTE: here we can check if we are running in in production on vercel and get
  // the public URL at build time for the ShareButtons, or fall back to localhost in development.
  const PUBLIC_DOMAIN = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  await connectDB();

  // query the property in the DB
  const propertyDoc = await Property.findById(params.id).lean();

  // convert the document to a plain js object so we can pass to client
  // components
  const property = convertToSerializeableObject(propertyDoc);

  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Properties
          </Link>
        </div>
      </section>

      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <PropertyDetails property={property} />
            <aside className='space-y-4'>
              <BookmarkButton property={property} />
              <ShareButtons property={property} PUBLIC_DOMAIN={PUBLIC_DOMAIN} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};
export default PropertyPage;
```

Now we have a server component that queries the property data from the database and passes it to the client components.

We need to now set the `app/components/PropertyImages.jsx` and the `app/components/ShareButtons.jsx` to be client components.

Add this to the top of both files:

```javascript
'use client';
```

Now our single property page is a server component that queries the property data from the database and passes it to the client components.

Now we can delete the following:

- The GET request handler from `app/api/properties/[id]/route.js`
