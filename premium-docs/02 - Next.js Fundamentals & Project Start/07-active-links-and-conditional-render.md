# Active Links & Conditional Rendering

In the last lesson, we created our Navbar component and added the `<Link>` and `<Image>` components from Next.js. We also added dropdown functionality. Now I want to add some styles for active links and conditionally render the login/register and profile/logout links. Obviously, we have not created the login system yet, but for now we can just have a hard-coded piece of state that says whether or not the user is logged in.

## Active Links

If there is a `bg-black` class on any of the links, remove it.

First, let's import the `usePathName`

```jsx
import { usePathname } from 'next/navigation';
```

In older versions of Next.js, we used the `useRouter` hook. Now this has been put into the `next/navigation` package.

Then we can create a variable called `pathname` and set it to the `usePathname` hook:

```jsx
const pathname = usePathname();
```

Now, we need to add a condition to the classes for the links. If the `pathname` is equal to the `href` of the link, add the `bg-black` class.

Start with the desktop links:

```jsx
{
  /* <!-- Desktop Menu Hidden below md screens --> */
}
<div className='hidden md:ml-6 md:block'>
  <div className='flex space-x-3'>
    <Link
      href='/'
      className={`${
        pathname === '/' ? 'bg-black' : ''
      } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
    >
      Home
    </Link>
    <Link
      href='/properties'
      className={`${
        pathname === '/properties' ? 'bg-black' : ''
      } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
    >
      Properties
    </Link>
    <Link
      href='/properties/add'
      className={`${
        pathname === '/properties/add' ? 'bg-black' : ''
      } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
    >
      Add Property
    </Link>
  </div>
</div>;
```

Now do the mobile links:

```jsx
<div id='mobile-menu'>
  <div className='space-y-1 px-2 pb-3 pt-2'>
    <Link
      href='/'
      className={`${
        pathname === '/' ? 'bg-black' : ''
      } text-white block rounded-md px-3 py-2 text-base font-medium`}
    >
      Home
    </Link>
    <Link
      href='/properties'
      className={`${
        pathname === '/properties' ? 'bg-black' : ''
      } text-white block rounded-md px-3 py-2 text-base font-medium`}
    >
      Properties
    </Link>
    <Link
      href='/properties/add'
      className={`${
        pathname === '/properties/add' ? 'bg-black' : ''
      } text-white block rounded-md px-3 py-2 text-base font-medium`}
    >
      Add Property
    </Link>
  </div>
</div>
```

Now, when you are on one of these three pages, the link will be active.

## Conditionally Render Links

Now, we need to conditionally render the login/register and profile/logout links. Later, we will do this depending on if there is a session, but for now we will just add a piece of state. We can do this by creating a piece of state called `isLoggedIn` and set it to `false` by default:

```jsx
const [isLoggedIn, setIsLoggedIn] = useState(false);
```

Then, we can add a condition around the login/register links:

```jsx
{
  /* <!-- Right Side Menu (Logged Out) --> */
}
{
  !isLoggedIn && (
    <div className='hidden md:block md:ml-6'>
      <div className='flex items-center'>
        <button className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>
          <FaGoogle className='text-white mr-2' />
          <span>Login or Register</span>
        </button>
      </div>
    </div>
  );
}
```

Now add a condition around the profile/logout links:

```jsx
{
  /* <!-- Right Side Menu (Logged In) --> */
}
{
  isLoggedIn && (
    <div className='absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
      <Link href='/messages' className='relative group'>
        <button
          type='button'
          className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
        >
          <span className='absolute -inset-1.5'></span>
          <span className='sr-only'>View notifications</span>
          <svg
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
            />
          </svg>
        </button>
        <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
          2{/* <!-- Replace with the actual number of notifications --> */}
        </span>
      </Link>
      {/* <!-- Profile dropdown button --> */}
      <div className='relative ml-3'>
        <div>
          <button
            type='button'
            className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
            id='user-menu-button'
            aria-expanded='false'
            aria-haspopup='true'
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
          >
            <span className='absolute -inset-1.5'></span>
            <span className='sr-only'>Open user menu</span>
            <Image
              className='h-8 w-8 rounded-full'
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              alt=''
            />
          </button>
        </div>

        {/* <!-- Profile dropdown --> */}
        {isProfileMenuOpen && (
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
        )}
      </div>
    </div>
  );
}
```

We also need to wrap the mobile version of the login/register links:

```jsx
 {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {isMobileMenuOpen && (
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
            {/* Add this */}
            {!isLoggedIn && (
              <div className='block md:ml-6'>
                <div className='flex items-center'>
                  <button className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-3'>
                    <FaGoogle className='text-white mr-2' />
                    <span>Login or Register</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
```

Now you can see that the links are conditionally rendered based on the `isLoggedIn` state.
