# Featured Properties

We are going to have a couple properties that are showcased on the homepage based on if the `is_featured` flag is set to true in the database. Open up Compass and change 2 properties to `is_featured: true`.

## API Route

We have a bunch of options for the API. We could add a query param on to the `/api/properties` route, but now that we have all of the pagination stuff, I'd rather just have a new one. Let's create `app/api/properties/featured` and add the following:

```jsx
import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/featured
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({
    	is_featured: true
    	});

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
```

You can test it by going to `http://localhost:3000/api/properties/featured`.

Now create a new file at `components/FeaturedProperties.jsx` and add the following:

```jsx
const FeaturedProperties= ({ loading }) => {
  return (
    <div>FeaturedProperties</div>
  );
};
export default FeaturedProperties;

```

Import it into the homepage at `app/page.jsx` and embed it above the home properties:

```jsx
import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';
import FeaturedProperties from '@/components/FeaturedProperties';

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};
export default HomePage;

```

Copy the `<section>` from the featured properties from the theme files `index.html` file. Change all the `class` to `className`. It will look like this:

```jsx
const FeaturedProperties= () => {
  return (
   <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row"
          >
            <img
              src="images/properties/f1.jpg"
              alt=""
              className="object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold">Seaside Retreat</h3>
              <div className="text-gray-600 mb-4">Condo</div>
              <h3
                className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
              >
                $2,500/wk
              </h3>
              <div className="flex justify-center gap-4 text-gray-500 mb-4">
                <p>
                  <i className="fa-solid fa-bed"></i> 4
                  <span className="md:hidden lg:inline">Beds</span>
                </p>
                <p>
                  <i className="fa-solid fa-bath"></i> 3
                  <span className="md:hidden lg:inline">Baths</span>
                </p>
                <p>
                  <i className="fa-solid fa-ruler-combined"></i>
                  2,800 <span className="md:hidden lg:inline">sqft</span>
                </p>
              </div>

              <div
                className="flex justify-center gap-4 text-green-900 text-sm mb-4"
              >
                <p><i className="fa-solid fa-money-bill"></i> Nightly</p>
                <p><i className="fa-solid fa-money-bill"></i> Weekly</p>
              </div>

              <div className="border border-gray-200 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                  <i
                    className="fa-solid fa-location-dot text-lg text-orange-700"
                  ></i>
                  <span className="text-orange-700"> Boston MA </span>
                </div>
                <a
                  href="property.html"
                  className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                  Details
                </a>
              </div>
            </div>
          </div>
          <div
            className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row"
          >
            <img
              src="images/properties/e1.jpg"
              alt=""
              className="object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold">Modern Downtown Studio</h3>
              <div className="text-gray-600 mb-4">Studio</div>
              <h3
                className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
              >
                $4,200/mo
              </h3>
              <div className="flex justify-center gap-4 text-gray-500 mb-4">
                <p>
                  <i className="fa-solid fa-bed"></i> 1
                  <span className="md:hidden lg:inline">Beds</span>
                </p>
                <p>
                  <i className="fa-solid fa-bath"></i> 1
                  <span className="md:hidden lg:inline">Baths</span>
                </p>
                <p>
                  <i className="fa-solid fa-ruler-combined"></i>
                  900 <span className="md:hidden lg:inline">sqft</span>
                </p>
              </div>

              <div
                className="flex justify-center gap-4 text-green-900 text-sm mb-4"
              >
                <p><i className="fa-solid fa-money-bill"></i> Nightly</p>
                <p><i className="fa-solid fa-money-bill"></i> Weekly</p>
              </div>

              <div className="border border-gray-200 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                  <i
                    className="fa-solid fa-location-dot text-lg text-orange-700"
                  ></i>
                  <span className="text-orange-700"> Chicago IL </span>
                </div>
                <a
                  href="property.html"
                  className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                  Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
```

## Fetching the Data

Instead of creating a new request, let's utilize the `fetchProperties` function in the `utils/requests.js` file. We can add an object as a param with a `showFeatured` option:

```jsx
async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties${showFeatured ? '/featured' : ''}`, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}
```

We are just adding `/featured` to the endpoint if that option is true.

Now bring in the function and loop over the properties and display in the `FeaturedProperties` component:

```jsx
import {fetchProperties} from '@/utils/requests';

const FeaturedProperties= () => {
	const properties = fetchProperties({
		showFeatured: true
	})

  return properties.length > 0 && (
   <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

       		{randomProperties.map((property, index) => (
              <FeaturedPropertyCard property={property} key={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
```

## Featured Property Card

Create a file at `/components/FeaturedPropertyCard.jsx` and add the following:

```jsx
import Image from 'next/image';
import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';


const FeaturedPropertyCard = ({property}) => {
	const getRateDisplay = () => {
    const { rates } = property;

    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
  };

	return (
   <div
    className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row"
  >
     <Image
        src={property.images[0]}
        alt=''
        height={0}
        width={0}
        sizes='100vw'
        className="object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
      />
    <div className="p-6">
      <h3 className="text-xl font-bold">{property.name}</h3>
      <div className="text-gray-600 mb-4">{property.type}</div>
      <h3
        className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
      >
       ${getRateDisplay()}
      </h3>
      <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className='inline mr-2' /> {property.beds}{' '}
            <span className='md:hidden lg:inline'>Beds</span>
          </p>
          <p>
            <FaBath className='inline mr-2' />
            {property.baths} <span className='md:hidden lg:inline'>Baths</span>
          </p>
          <p>
            <FaRulerCombined className='inline mr-2' />
            {property.square_feet}{' '}
            <span className='md:hidden lg:inline'>sqft</span>
          </p>
      </div>

      <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          {property.rates.nightly && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Nightly
            </p>
          )}

          {property.rates.weekly && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Weekly
            </p>
          )}

          {property.rates.monthly && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Monthly
            </p>
          )}
        </div>

      <div className="border border-gray-200 mb-5"></div>

      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex align-middle gap-2 mb-4 lg:mb-0">
           <FaMapMarker className='text-orange-700 mt-1' />
          <span className="text-orange-700"> 
              {property.location.city} {property.location.state}</span>
        </div>
          <Link
            href={`/properties/${property._id}`}
          className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Details
        </Link>
      </div>
    </div>
  </div>
);
}

export default FeaturedPropertyCard;
```
