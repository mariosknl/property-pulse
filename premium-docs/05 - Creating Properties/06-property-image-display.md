## Property Image Display

Now we need to display the images on the properties, homepage and property page.

## Add Config

We need to add the cloudinary domain to the images config just like we did for the Google images. Open the `next.config.js` and add the Cloudinary domain as well. It should look like this:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
```

## PropertyCard Component

The home and properties pages are easy because we are using the `PropertyCard` component. We just need to update the `PropertyCard` component by removing the `/images/properties` path from the `src` attribute.

Change the `src` attribute in the `PropertyCard` component to `{property.images[0]}`.

```js
<Image
  src={property.images[0]}
  alt=''
  width='0'
  height='0'
  sizes='100vw'
  className='w-full h-auto rounded-t-xl'
/>
```

## Single Property Page

Now for the single page, which uses the `ProperyHeaderImage` component to display the first image in the array at the very top.

Open the `components/PropertyHeaderImage.jsx` file.

We need to get rid of the `/images/properties` path because obviously the Cloudinary url is different. So the src should just be `{image}`.

```js
import Image from 'next/image';

const PropertyHeaderImage = ({ image }) => {
  return (
    <section>
      <div className='container-xl m-auto'>
        <div className='grid grid-cols-1'>
          <Image
            src={image} // Change this line
            alt=''
            className='object-cover h-[400px]'
            width={1800}
            height={400}
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};
export default PropertyHeaderImage;
```

## `PropertyImages` Component

For the rest of the images in the array, we will create a new component called `PropertyImages`. This component will display the images in a grid. Open the `components/PropertyImages.jsx` file and add the following code:

```js
import Image from 'next/image';

const PropertyImages = ({ images }) => {
  return (
    <section className='bg-blue-50 p-4'>
      <div className='container mx-auto'>
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=''
            className='object-cover h-[400px] mx-auto rounded-xl'
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className={`grid grid-cols-2 gap-4`}>
            {images.map((image, index) => (
              <div
                key={index}
                className={`${
                  images.length === 3 && index === 2
                    ? 'col-span-2'
                    : 'col-span-1'
                }`}
              >
                <Image
                  src={image}
                  alt=''
                  className='object-cover h-[400px] w-full rounded-xl'
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
```

This component is quite dynamic. It will display the first image in the array if there is only one image. If there are more than one image, it will display the images in a grid. If there are three images, the third image will span two columns.

Import the component into the `app/properties/[id]/page.jsx` file and add it add the bottom just before the `</>`:

```js
  <PropertyImages images={property.images} />
```

Pass the `images` array to the component.

At this point, if you go to any of the other property pages, you will see an error because we are no longer looking in the `/images/properties` folder. We are now looking in Cloudinary. In the next video, we can clean our listings up a bit.
