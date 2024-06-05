# Profile User Info

We need a place that will list all of a user's specific properties and show any other user information. Let's start on the profile page.

Create a page at `app/profile/page.jsx` and copy the html from the theme files `profile.html` page. Be sure to change the `class` attributes to `className`.

Let's also bring in the `Image` and `Link` components and replace the `img` and `a` tags with them. We also need to make this a client component because we will be using hooks.

It should be something like this for now:

```jsx
'use client';
import Image from 'next/image';
import Link from 'next/link';

const ProfilePage = () => {
  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>

          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <Link href='/property.html'>
                  <Image
                    className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                    src='/images/profile.png'
                    alt='User'
                    width={200}
                    height={200}
                    priority={true}
                  />
                </Link>
              </div>

              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span> John Doe
              </h2>
              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span> john@gmail.com
              </h2>
            </div>
            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>

              <div className='mb-10'>
                <Link href='/property.html'>
                  <Image
                    className='h-32 w-full rounded-md object-cover'
                    src='/images/properties/a1.jpg'
                    alt='Property 2'
                    width={500}
                    height={100}
                  />
                </Link>
                <div className='mt-2'>
                  <p className='text-lg font-semibold'>Property Title 1</p>
                  <p className='text-gray-600'>Address: 123 Main St</p>
                </div>
                <div className='mt-2'>
                  <Link
                    href='/add-property.html'
                    class='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
                  >
                    Edit
                  </Link>
                  <button
                    className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
                    type='button'
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className='mb-10'>
                <Image
                  className='h-32 w-full rounded-md object-cover'
                  src='/images/properties/b1.jpg'
                  alt='Property 2'
                  width={500}
                  height={100}
                />
                <div className='mt-2'>
                  <p className='text-lg font-semibold'>Property Title 2</p>
                  <p className='text-gray-600'>Address: 456 Elm St</p>
                </div>
                <div className='mt-2'>
                  <Link
                    href='/add-property.html'
                    class='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
                  >
                    Edit
                  </Link>
                  <button
                    className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
                    type='button'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
```

We need to bring in the users info like the image, name and email as well as the user properties. We won't really have the option to edit user info because we are using Google Auth, but we will add the option to edit and delete properties from here.

## User Data

We need to bring in the session from Next Auth and display the user info. Let's import the `useSession` hook as well as the profile default image:

```jsx
import { useSession } from 'next-auth/react';
import profileDefault from '@/assets/images/profile.png';
```

Now get the session and bring in the image, email and name:

```jsx
const { data: session } = useSession();
const profileImage = session?.user?.image;
const profileName = session?.user?.name;
const profileEmail = session?.user?.email;
```

We can use the profile image if it exists, otherwise we will use the default image:

```jsx
<Image
  className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
  src={profileImage || profileDefault}
  alt='User'
  width={200}
  height={200}
  priority={true}
/>
```

Let's add the user name and email:

```jsx
 <h2 className='text-2xl mb-4'>
    <span className='font-bold block'>Name: </span> {profileName}
  </h2>
  <h2 className='text-2xl'>
    <span className='font-bold block'>Email: </span> {profileEmail}
  </h2>
```
