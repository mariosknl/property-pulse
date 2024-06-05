# Photoslide Lightbox

In this lesson, we will create a lightbox for the photoslide. The lightbox will be a modal that will display the photo in a larger size when the user clicks on the photo. The user can also scroll through the photos in the lightbox.

Install `photoslide` and `react-photoswipe-gallery` packages.

```bash
npm install photoswipe react-photoswipe-gallery
```

Add the CSS import to the `app/layout.jsx` file.

```jsx
import 'photoswipe/dist/photoswipe.css';
```

Open the `components/PropertyImages.jsx` file and import the `Gallery` and `Item` components.

```jsx
import { Gallery, Item } from 'react-photoswipe-gallery';
```

You want to wrap the entire `PropertyImages` component with the `Gallery` component. The `Gallery` component will provide the lightbox functionality to the `Item` components.

You also want to wrap the `<Image>` components with the `Item` component. The `Item` component will provide the lightbox functionality to the images. Then inside the `Item` component, wrap the `<Image>` component with a function that takes in `ref` and `open` as arguments. The `ref` will be used to open the lightbox and the `open` will be used to close the lightbox.

The entire component should look like this:

```jsx
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

const PropertyImages = ({ images }) => {
  return (
    <Gallery>
      <section className='bg-blue-50 p-4'>
        <div className='container mx-auto'>
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width='1000'
              height='600'
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt=''
                  className='object-cover h-[400px] mx-auto rounded-xl'
                  width={1800}
                  height={400}
                  priority={true}
                />
              )}
            </Item>
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
                  <Item
                    original={image}
                    thumbnail={image}
                    width='1000'
                    height='600'
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt=''
                        className='object-cover h-[400px] w-full rounded-xl'
                        width={1800}
                        height={400}
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
```

Now you should be able to click on the images and see the lightbox modal with the larger image and scroll through the images.
