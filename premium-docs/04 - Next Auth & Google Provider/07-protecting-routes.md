# Protecting Routes

There will be pages that we don't want to be accessed unless the user is logged in. For example, the add property page should only be accessible to logged in users. We can protect routes by using a middleware function.

## Create Middleware

Create a new file in the project root called `middleware.js` and add the following code:

```js
export { default } from 'next-auth/middleware';

export const config = { matcher: ['/properties/add'] };
```

This will apply the middleware to the `/properties/add` route. We can add more routes later.

Save the file and then click on `Add Property`. It will require you to log in. However, we don't even want to show the `Add Property` link if the user is not logged in.

Open the `components/Navbar.jsx` file and add check for the session before showing the add property links on both desktop and mobile.

Desktop:

```js
{
  session && (
    <Link
      href='/properties/add'
      className={`${
        pathname === '/properties/add' ? 'bg-black' : ''
      } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
    >
      Add Property
    </Link>
  );
}
```

Mobile:

```js
{
  session && (
    <Link
      href='/properties/add'
      className={`${
        pathname === '/properties/add' ? 'bg-black' : ''
      } text-white block rounded-md px-3 py-2 text-base font-medium`}
    >
      Add Property
    </Link>
  );
}
```

Now we don't see the link and even if you go to the `/properties/add` route, it will redirect you to the login page.
