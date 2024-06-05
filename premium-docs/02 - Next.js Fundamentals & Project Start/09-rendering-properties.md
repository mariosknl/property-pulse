# Rendering Properties

Before we get into databases and dynamic data, let's take a look at how we can render properties in our components. For now, we will use a JSON file with some properties. I have attached a file to this section called `properties.json`. You can download it and place it in the root of the project. I will also put it in the Github repo.

## Properties Page

Let's start by putting the properties in the `properties` page/component. We will leave the homepage for later. First, let's import the data into `pages/properties/page.jsx`:

```js
import properties from '@/properties.json';
```

Now, let's loop through the properties and render them. We will also check to see if there are no properties and display a message:

```js
const PropertiesPage = () => {
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <div>{property.name}</div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
```

You should see the property names on the screen.

## Property Card

I want to have a component for properties to be displayed in. Let's create a file at `components/PropertyCard.jsx`. You can copy the HTML from the theme files properties.html if you want. Just be sure to change all `class` attributes to `className`.

We also want to import the `Link` and `Image` components from Next.js:

Then we want to replace the hard-coded values to use the property data. It should end up looking like this so far:

```js
import Image from 'next/image';
import Link from 'next/link';

const PropertyCard = ({ property }) => {
  return (
    <div className='rounded-xl shadow-md relative'>
      <img
        src='images/properties/a1.jpg'
        alt=''
        className='object-cover rounded-t-xl'
      />
      <div className='p-4'>
        <div className='text-left md:text-center lg:text-left mb-6'>
          <div className='text-gray-600'>{property.type}</div>
          <h3 className='text-xl font-bold'>{property.name}</h3>
        </div>
        <h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          {property.rates.monthly}
        </h3>

        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <i className='fa-solid fa-bed'></i> {property.beds}
            <span className='md:hidden lg:inline'> Beds</span>
          </p>
          <p>
            <i className='fa-solid fa-bath'></i> {property.baths}
            <span className='md:hidden lg:inline'> Baths</span>
          </p>
          <p>
            <i className='fa-solid fa-ruler-combined'></i> {
              property.square_feet
            }
            <span className='md:hidden lg:inline'> sqft</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          <p>
            <i className='fa-solid fa-money-bill'></i> Weekly
          </p>
          <p>
            <i className='fa-solid fa-money-bill'></i> Monthly
          </p>
        </div>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <i className='fa-solid fa-location-dot text-lg text-orange-700'></i>
            <span className='text-orange-700'>
              {' '}
              {property.location.city}, {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PropertyCard;
```

We just swapped out the hard-coded values for the property data. We also changed the button link to go to the property details page.

Now, let's bring in the `PropertyCard` component into the `PropertiesPage` component and use that instead of the `div`:

```js
import properties from '@/properties.json';
import PropertyCard from '@/components/PropertyCard';

const PropertiesPage = () => {
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
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

export default PropertiesPage;
```

I used the index for the key, but because there is no `_id` field in the JSON data because we will be importing it into MongoDB and it will create the `_id` field for us.

You should see the cards, however the images and icons are not showing. Let's fix that.

## Icons

Let's bring in the icons from `react-icons/fa`:

```js
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill } from 'react-icons/fa';
```

Now add the first set of icons to the card:

```js
<div className='flex justify-center gap-4 text-gray-500 mb-4'>
  <p>
    <FaBed className='md:hidden lg:inline mr-2' /> {property.beds}
    <span className='md:hidden lg:inline'> Beds</span>
  </p>
  <p>
    <FaBath className='md:hidden lg:inline mr-2' /> {property.baths}
    <span className='md:hidden lg:inline'> Baths</span>
  </p>
  <p>
    <FaRulerCombined className='md:hidden lg:inline  mr-2' />{' '}
    {property.square_feet}
    <span className='md:hidden lg:inline'> sqft</span>
  </p>
</div>
```

Now the money bill icon:

```js
<div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
  <p>
    <FaMoneyBill className='md:hidden lg:inline mr-2' /> Weekly
  </p>
  <p>
    <FaMoneyBill className='md:hidden lg:inline mr-2' /> Monthly
  </p>
</div>
```

## Images

For the images, we will just put them into the `public` folder for now. Ultimately, we will use a 3rd party image hosting service like Cloudinary.

Create a folder in `/public` called `images`. Then in that folder, create a folder called `properties`. Then copy the images from the theme files into that folder.

Let's bring in the `Image` component from Next.js:

```js
import Image from 'next/image';
```

Then we can use it in the card:

```js
<Image
  src={`/images/properties/${property.images[0]}`}
  alt=''
  width='0'
  height='0'
  sizes='100vw'
  className='w-full h-auto rounded-t-xl'
/>
```

## Rate Conditions

Some of the properties have different rates for nightly, weekly and monthly. We want to check if there is a monthly rate and show that. If not, then show weekly and if not, then show nightly.

let's create a function to check the rates. Add this right above the return statement:

```js
const getRateDisplay = () => {
  const { rates } = property;
  if (rates.monthly) {
    return `$${rates.monthly.toLocaleString()}/mo`;
  } else if (rates.weekly) {
    return `$${rates.weekly.toLocaleString()}/wk`;
  } else if (rates.nightly) {
    return `$${rates.nightly.toLocaleString()}/night`;
  }
};
```

Then we can use it in the card:

```js
<h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
  {getRateDisplay()}
</h3>
```

Now our properties should be looking good.
