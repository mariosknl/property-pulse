# Display Single Property

We can now fetch a single property from the API. Let's display it on the page.

Open the `app/properties/[id]/page.jsx` file.

## Property Header Image

Let's start with the image in the header of the property page. This will have the first image in the array. Later we will have another component that will display all images in the array.

We need the HTML from the theme files. Let's start with the top image. Open the `theme-files/property.html` file and copy the `<section>` under the `<!-- Property Header Image -->` comment. It looks like this:

```html
<section>
  <div class="container-xl m-auto">
    <div class="grid grid-cols-1">
      <img
        src="images/properties/a1.jpg"
        alt=""
        class="object-cover h-[400px]"
        width="1800"
      />
    </div>
  </div>
</section>
```

Let's create a separate component for this. Create a new file at `components/PropertyHeaderImage.jsx`. We are going to use the HTML but change it up a bit to be dynamic. Ultimately, we want the following:

```jsx
import Image from 'next/image';

const PropertyHeaderImage = ({ image }) => {
  return (
    <section>
      <div className='container-xl m-auto'>
        <div className='grid grid-cols-1'>
         <Image
            src={`/images/properties/${image}`}
            alt=''
            className='object-cover h-[400px] w-full'
            width={0}
            height={0}
            sizes='100vw'
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};
export default PropertyHeaderImage;
```

We are using the `Image` component from Next.js. We are passing the `image` prop to the component. We are using the `image` prop to set the `src` attribute of the `Image` component. We are also setting the `width` and `height` attributes.

Let's go back to the `app/properties/[id]/page.jsx` file and import the `PropertyHeaderImage` component and display it:

```jsx
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import { fetchProperty } from '@/app/properties/requests';

const PropertyPage = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      const property = await fetchProperty(id);
      setProperty(property);
      setLoading(false);
    };

    fetchPropertyData();
  }, [id]);

  if (!property && !loading)
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );

  return <>{!loading && property && (<>
    <PropertyHeaderImage image={property.images[0]} />
    </>)}</>;
};

export default PropertyPage;
```

We are checking to make sure that `loading` is `false` before displaying the `PropertyHeaderImage` component. We are passing the `image` property to the component with the first array value in the images array. We are also adding a conditional to check if the property is not found and display a message.

You should see the image on the page.

## Property Details

Now let's do the rest of the page. We will be using the html from the `theme-files/property.html` file and the `<section>`s under `<!-- Go Back -->` and `<!-- Property Info -->`.

This is a lot of HTML. It includes the main part and the sidebar with the form and buttons. We will break some of that up into components later.

There are a few things we need to do to make this work.

- Wrap both the `Go Back` and `Property Info` sections in a conditional statement to make sure that the property is loaded before displaying them.
- Change the `<a>` tags to `<Link>` tags and change the url
- Rename `class` to `className`
- Rename `for` to `htmlFor`
- Rename `enctype` to `encType`
- Comment out the comments
- Import the font awesome icons and replace the `<i>` tags
- Add the dynamic data including looping over the `amenities` array
- Add conditional to check for rates and display them if they exist

Here is the final code for now:

```jsx
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaPaperPlane,
  FaBookmark,
  FaShare,
  FaMapMarker,
  FaArrowLeft,
} from 'react-icons/fa';
import { fetchProperty } from '@/app/properties/requests';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';

const PropertyPage = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      const property = await fetchProperty(id);
      setProperty(property);
      setLoading(false);
    };

    fetchPropertyData();
  }, [id]);

  if (!property && !loading)
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );

    return (
    <>
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className='container m-auto py-6 px-6'>
              <Link
                href='/properties.html'
                className='text-blue-500 hover:text-blue-600 flex items-center'
              >
                <i className='fas fa-arrow-left mr-2'></i> Back to Properties
              </Link>
            </div>
          </section>
        <section className='bg-blue-50'>
          <div className='container m-auto py-10 px-6'>
            <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
              <main>
                <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                  <div className='text-gray-500 mb-4'>{property.type}</div>
                  <h1 className='text-3xl font-bold mb-4'>{property.name}</h1>
                  <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                    <FaMapMarker className='text-orange-700 mr-2 text-lg' />
                    <p className='text-orange-700'>
                      {property.location.street}, {property.location.city}{' '}
                      {property.location.state}
                    </p>
                  </div>

                  <h3 className='text-lg font-bold my-6 bg-gray-800 text-white p-2'>
                    Rates & Options
                  </h3>
                  <div className='flex flex-col md:flex-row justify-around'>
                    <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
                      <div className='text-gray-500 mr-2 font-bold'>
                        Nightly
                      </div>
                      <div className='text-2xl font-bold'>
                        {property.rates.nightly ? (
                          `$${property.rates.nightly.toLocaleString()}`
                        ) : (
                          <FaTimes className='text-red-700' />
                        )}
                      </div>
                    </div>
                    <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
                      <div className='text-gray-500 mr-2 font-bold'>Weekly</div>
                      <div className='text-2xl font-bold text-blue-500'>
                        {property.rates.weekly ? (
                          `$${property.rates.weekly.toLocaleString()}`
                        ) : (
                          <FaTimes className='text-red-700' />
                        )}
                      </div>
                    </div>
                    <div className='flex items-center justify-center mb-4 pb-4 md:pb-0'>
                      <div className='text-gray-500 mr-2 font-bold'>
                        Monthly
                      </div>
                      <div className='text-2xl font-bold text-blue-500'>
                        {property.rates.monthly ? (
                          `$${property.rates.monthly.toLocaleString()}`
                        ) : (
                          <FaTimes className='text-red-700' />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                  <h3 className='text-lg font-bold mb-6'>
                    Description & Details
                  </h3>
                  <div className='flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9'>
                    <p>
                      <FaBed className='inline-block mr-2' /> {property.beds}{' '}
                      <span className='hidden sm:inline'>Beds</span>
                    </p>
                    <p>
                      <FaBath className='inline-block mr-2' /> {property.baths}{' '}
                      <span className='hidden sm:inline'>Baths</span>
                    </p>
                    <p>
                      <FaRulerCombined className='inline-block mr-2' />
                      {property.square_feet} <span className='hidden sm:inline'>sqft</span>
                    </p>
                  </div>
                  <p className='text-gray-500 mb-4'>{property.description}</p>
                </div>

                <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                  <h3 className='text-lg font-bold mb-6'>Amenities</h3>

                  <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2'>
                    {property.amenities.map((amenity, index) => (
                      <li key={index}>
                        <FaCheck className='inline-block mr-2 text-green-600' />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                  <div id='map'></div>
                </div>
              </main>

              {/* <!-- Sidebar --> */}
              <aside className='space-y-4'>
                <div>
                  <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
                    <FaBookmark className='mr-2' />
                    Bookmark Property
                  </button>
                </div>
                <div>
                  <button className='bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
                    <FaShare className='mr-2' /> Share Property
                  </button>
                </div>

                {/* <!-- Contact Form --> */}
                <div className='bg-white p-6 rounded-lg shadow-md'>
                  <h3 className='text-xl font-bold mb-6'>
                    Contact Property Manager
                  </h3>
                  <form
                    action='mailto:support@traversymedia.com'
                    method='post'
                    encType='text/plain'
                  >
                    <div className='mb-4'>
                      <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='email'
                      >
                        Email:
                      </label>
                      <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='email'
                        type='email'
                        placeholder='Enter your email'
                      />
                    </div>
                    <div className='mb-4'>
                      <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='message'
                      >
                        Message:
                      </label>
                      <textarea
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
                        id='message'
                        placeholder='Enter your message'
                      ></textarea>
                    </div>
                    <div>
                      <button
                        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
                        type='submit'
                      >
                        <FaPaperPlane className='mr-2' /> Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PropertyPage;
```

In the next lesson, we will add a spinner component to display while the property is loading.
