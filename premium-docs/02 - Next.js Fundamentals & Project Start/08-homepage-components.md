# Homepage Components

I want to start to get some of the homepage components in place such as the hero section, the info boxes and the footer. We aren't going to add the search functionality in the hero yet, but let's get the components in place.

## Hero Section

Create a new file at `components/Hero.jsx` and add the following:

```js
const Hero = () => {
  return <div>Hero</div>;
};
export default Hero;
```

Then import it into `app/page.jsx` and add it to the page:

```js
import Hero from '../components/Hero';
```

You can get rid of the `h1` tag and the `<Link>` tag as well as the Link import. Then add the `<Hero>` component to the page:

```js
import Hero from '../components/Hero';

const HomePage = () => {
  return (
    <>
      <Hero />
    </>
  );
};
export default HomePage;
```

Now, add the hero HTML from the theme files. Be sure to change `class` to `className` and `for` to `htmlFor`. Also, comments should be wrapped in `{/* */}` Here is the code:

```js
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
        {/* <!-- Form Component --> */}
        <form className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'>
          <div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
            <label htmlFor='location' className='sr-only'>
              Location
            </label>
            <input
              type='text'
              id='location'
              placeholder='Enter Location or Keyword'
              className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
            />
          </div>
          <div className='w-full md:w-2/5 md:pl-2'>
            <label htmlFor='property-type' className='sr-only'>
              Property Type
            </label>
            <select
              id='property-type'
              className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
            >
              <option value='All'>All</option>
              <option value='Apartment'>Apartment</option>
              <option value='Studio'>Studio</option>
              <option value='Condo'>Condo</option>
              <option value='House'>House</option>
              <option value='Cabin Or Cottage'>Cabin or Cottage</option>
              <option value='Loft'>Loft</option>
              <option value='Room'>Room</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <button
            type='submit'
            className='md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500'
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};
export default Hero;
```

Like I said, we will work on the actual search functionality later. For now, we just want to get the components in place.

## Info Boxes

We have two info boxes under the hero section. Let's create a re-usable component for these.

Create a new file at `components/InfoBox.jsx` and add the following:

```js
const InfoBox = ({
  heading,
  backgroundColor = 'bg-gray-100',
  textColor = 'text-gray-800',
  buttonInfo,
  children,
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>
      <a
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text}
      </a>
    </div>
  );
};
export default InfoBox;

```

We are using a lot of dynamic classes here. We are using the `backgroundColor` and `textColor` props to set the background and text colors. We are also using the `buttonInfo` prop to set the button text and link. We are also using the `children` prop to set the text inside the box.

## InfoBoxes Component

Instead of adding a whole section to the homepage component, let's have a separate component for the info boxes. Create a new file at `components/InfoBoxes.jsx` and add the following:

```js
import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <InfoBox
            heading='For Renters'
            backgroundColor='bg-gray-100'
            buttonInfo={{
              text: 'Browse Properties',
              link: '/properties',
              backgroundColor: 'bg-black',
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            heading='For Property Owners'
            backgroundColor='bg-blue-100'
            buttonInfo={{
              text: 'Add Property',
              link: '/properties/add',
              backgroundColor: 'bg-blue-500',
            }}
          >
            List your properties and reach potential tenants. Rent as an Airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};
export default InfoBoxes;
```

Then import it into `app/page.jsx` and embed it under the hero section:

```js
import Hero from '../components/Hero';
import InfoBoxes from '@/components/InfoBoxes';

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
    </>
  );
};
export default HomePage;
```

## Footer

Now, let's add the footer. Create a new file at `components/Footer.jsx` and add the following:

```js
import Image from 'next/image';
import logo from '@/assets/images/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-200 py-4 mt-24'>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between px-4'>
        <div className='mb-4 md:mb-0'>
          <Image src={logo} alt='Logo' className='h-8 w-auto' />
        </div>
        <div className='flex flex-wrap justify-center md:justify-start mb-4 md:mb-0'>
          <ul className='flex space-x-4'>
            <li>
              <a href='/properties'>Properties</a>
            </li>
            <li>
              <a href='/terms'>Terms of Service</a>
            </li>
          </ul>
        </div>
        <div>
          <p className='text-sm text-gray-500 mt-2 md:mt-0'>
            &copy; {currentYear} PropertyPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

We are bringing in the `Image` component from Next.js. We are also importing the logo image. We are using the `Image` component to display the logo. We are also using the `currentYear` variable to display the current year.

Then import it into `app/page.jsx` and add it to the bottom of the page:

```js
import Hero from '../components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <Footer />
    </>
  );
};
export default HomePage;
```

Now we have most of the components for the homepage being displayed.
