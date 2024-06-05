# Property Search Component

Right now we have a component called `Hero` that has a search form. We want to move that search form into its own component so that we can reuse it in other places.

Copy the `<form>` element from `Hero` and paste it into a new file called `PropertySearch.js` in the `src/components` directory.

```jsx
const PropertySearch = () => {
  return (
    <form className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'>
      {<-- form code -->}
    </form>
  )
}

export default PropertySearch
```

Import it into the `Hero` component and replace the `<form>` element with the `<PropertySearch>` component.

```jsx
import PropertySearch from './PropertySearch';

const Hero = () => {
  return (
    <section className='bg-blue-700 py-20 mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'>
            Find The Perfect Rental
          </h1>
          <p className='my-4 text-xl text-white'>
            Discover the perfect property that suits your needs.
          </p>
        </div>
        <PropertySearch />
      </div>
    </section>
  );
};
export default Hero;
```

## Component State

Add the following state for the search form to the `PropertySearch` component.

```jsx
const [location, setLocation] = useState('');
const [propertyType, setPropertyType] = useState('All');
```

## Event Handlers

Add a `handleSubmit` event handler to the `<form>` element.

```jsx
<form
  className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'
  onSubmit={handleSubmit}
>
```

Create the `handleSubmit` function:

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(location, propertyType);
};
```

Add the following value and event handler to the location field:

```jsx
<input
  type='text'
  id='location'
  placeholder='Enter Location or Keyword'
  className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
  value={location}
  value={location}
  onChange={(e) => {
    setLocation(e.target.value);
  }}
/>
```

Add the following value and event handler to the property type field:

```jsx
<select
  id='property-type'
  name='propertyType'
  className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
  value={propertyType}
  onChange={(e) => {
    setPropertyType(e.target.value);
  }}
>
  {/* ... (options) */}
</select>
```

Fill the form out and you should see the values in your console.

Import the router and add this to the `handleSubmit` function:

```js
import { useRouter } from 'next/navigation';
```

```js
const handleSubmit = (e) => {
  e.preventDefault();

  if (location === '' && propertyType === 'All') {
    router.push('/properties');
  } else {
    // Create a query string from the form data
    const query = `?location=${location}&propertyType=${propertyType}`;

    // Redirect to the search page with the query string
    router.push(`/properties/search-results${query}`);
  }
};
```

Now when you submit the form, you should be redirected to the search results page with the query string in the URL. If the location and property type are empty, you will be redirected to the properties page.

