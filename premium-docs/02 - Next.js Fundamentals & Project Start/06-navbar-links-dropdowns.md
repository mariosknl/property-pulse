# Navbar Links, Dropdowns and React icons

We have our Navbar showing. There are a few more things that we have to add.

### Link Component

We need to change all of the links and use the `<Link>` component as opposed to the `<a>` tag. Add the following:

```jsx
import Link from 'next/link';
```

Now replace all of the `<a>` tags with `<Link>` tags. For example, the home link around the logo should look like this:

```jsx
{
  /* <!-- Logo --> */
}
<Link className='flex flex-shrink-0 items-center' href='/'>
  <Image class='h-10 w-auto' src={logo} alt='PropertyPulse' />

  <span class='hidden md:block text-white text-2xl font-bold ml-2'>
    PropertyPulse
  </span>
</Link>;
```

There is something like 14 links total on the page. Be sure to change them all.

Here are the urls to change:

- Home: `/`
- Properties: `/properties`
- Add Property: `/properties/add`
- Profile: `/profile`
- Saved Properties: `/properties/saved`
- Messages: `/messages`


### React icons

We will be using font awesome icons around the website including the login/register button. We could use the font awesome CDN, but instead, let's install the `React Icons` package and use that.

Open your terminal and run the following command:

```bash
npm i react-icons
```

Then we can import the Google icon into the `Navbar.jsx` component:

```js
import { FaGoogle } from 'react-icons/fa';
```

Replace the 2 `<i>` tags on the page with the `<FaGoogle />` component:

```jsx
<FaGoogle className='text-white mr-2' />
```

### Dropdowns

Now we need to make the dropdowns work. Since we need to make this component interactive and use hooks, we need it to be a client-side component. We can do this by adding `use client` to the top of the file. Let's do that and import the `useState` hook:

```jsx
'use client';
import { useState } from 'react';
```

### Mobile Dropdown

Let's create a new piece of state called `isMobileMenuOpen` and set it to `false`:

```jsx
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
```

Now we can add the `onClick` event handler to the mobile menu button:

```jsx
 {/* <!-- Mobile menu button--> */}
<button
  type='button'
  id='mobile-dropdown-button'
  className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
  aria-controls='mobile-menu'
  aria-expanded='false'
  onClick={() => setIsMobileMenuOpen((prev) => !prev)} // <-- Add this
>
```

Depending on the previous state. This will toggle the menu open and closed.

Now, find the mobile menu and only show it if `isMobileMenuOpen` is `true`. Remove the class `hidden` from the mobile menu div as well:

```jsx
{
  isMobileMenuOpen && (
    <div id='mobile-menu'>
      <div className='space-y-1 px-2 pb-3 pt-2'>
        <Link
          href='/'
          className='bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'
        >
          Home
        </Link>
        <Link
          href='/properties'
          className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
        >
          Properties
        </Link>
        <Link
          href='/properties/add'
          className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
        >
          Add Property
        </Link>
        <div className='block md:ml-6'>
          <div className='flex items-center'>
            <button className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-3'>
              <FaGoogle className='text-white mr-2' />
              <span>Login or Register</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Be sure to remove the `hidden` class from the mobile menu or the dropdown will not work.

### Profile Dropdown

We need to do the same thing for the profile dropdown. Create a new piece of state called `isProfileMenuOpen` and set it to `false`:

```jsx
const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
```

Now we can add the `onClick` event handler to the profile button:

```jsx
<button
  type='button'
  className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
  id='user-menu-button'
  aria-expanded='false'
  aria-haspopup='true'
  onClick={() => setIsProfileMenuOpen((prev) => !prev)} // <-- Add this
>
```

Now, find the profile menu and only show it if `isProfileMenuOpen` is `true`. Also, be sure to remove the `hidden` class from the profile menu or the dropdown will not work. We will also call `setIsProfileMenuOpen` to false when an item is clicked on.

```jsx
{
  isProfileMenuOpen && (
    <div
      id='user-menu'
      className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
      role='menu'
      aria-orientation='vertical'
      aria-labelledby='user-menu-button'
      tabIndex='-1'
    >
      <Link
        href='/profile'
        className='block px-4 py-2 text-sm text-gray-700'
        role='menuitem'
        tabIndex='-1'
        id='user-menu-item-0'
        onClick={() => {
          setIsProfileMenuOpen(false);
        }}
      >
        Your Profile
      </Link>
      <Link
        href='/properties/saved'
        className='block px-4 py-2 text-sm text-gray-700'
        role='menuitem'
        tabIndex='-1'
        id='user-menu-item-2'
        onClick={() => {
          setIsProfileMenuOpen(false);
        }}
      >
        Saved Properties
      </Link>
      <button
        className='block px-4 py-2 text-sm text-gray-700'
        role='menuitem'
        tabIndex='-1'
        id='user-menu-item-2'
      >
        Sign Out
      </button>
    </div>
  );
}
```

Now you should be able to click on the mobile menu button and the profile button and the dropdowns should work. I attached the final code to this lesson if you need it.

In the next lesson, we'll add some active links and conditionally render the login/register and profile/logout links.
