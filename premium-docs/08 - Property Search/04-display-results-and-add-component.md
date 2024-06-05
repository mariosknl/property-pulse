# Display Results

In this lesson, I want to display the results but also include the `PropertySearch` component on the results page so that the user can keep searching if needed.

## Display Results

Let's go ahead and display the search results on the `SearchResultsPage`. We are already filling the `properties` state with the results from the API, so we can use that to display the properties.

Add the following to the `app/properties/search-results/page.jsx` file:

```jsx
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
```

```jsx
 return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <Link
          href='/properties'
          className='flex items-center text-blue-500 hover:underline mb-3'
        >
          <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back to properties
        </Link>
        <h1 className='text-2xl mb-4'>Search Results</h1>
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

Now you should see all of the results on the page.

## Add Property Search Component

We are going to import the `PropertySearch` component and add it to the `SearchResultsPage` so that the user can keep searching if needed. We will need to re-arrange some things. Let's give the component it's own section with some styling.

Add the following to the `app/properties/search-results/page.jsx` file:

```jsx
import PropertySearch from '@/components/propertySearch';
```

```jsx
return (
    <>
      <section class='bg-blue-700 py-4'>
        <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start'>
          <PropertySearch />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className='px-4 py-6'>
          <div className='container-xl lg:container m-auto px-4 py-6'>
            <Link
              href='/properties'
              className='flex items-center text-blue-500 hover:underline mb-3'
            >
              <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back to properties
            </Link>
            <h1 className='text-2xl mb-4'>Search Results</h1>
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
      )}
    </>
  );
};
```

Now you can search and see the results on the page. You can also keep searching if needed.

We should also add the search to the main prooperties page as well. Open the `app/properties/page.jsx` file and add the `PropertySearch` component to the top of the page:

```jsx
import PropertySearch from '@/components/PropertySearch';
```

```jsx
  return (
    <>
      <section class='bg-blue-700 py-4'>
        <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start'>
          <PropertySearch />
        </div>
      </section>
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
    </>
  );
};
```

This is a server component, so we don't need to deal with the loading state. Now you can search from the main properties page as well.
