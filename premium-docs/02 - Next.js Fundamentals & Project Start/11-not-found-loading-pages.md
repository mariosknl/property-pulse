# Not Found & Loading Pages

In this lession, we will create a custom 404 page for when a route does not exist as well as a custom loading page with a spinner from the React Spinners package.

## Custom Not Found Page

By default, Next.js will show a 404 page if a page is not found. Let's create a custom 404 page. We can do this by creating a `not-found.jsx` file in the `app` directory:

```js
const NotFoundPage = () => {
  return <div>NotFoundPage</div>;
};
export default NotFoundPage;
```

you should see `NotFoundPage` in the browser if you go to a page that does not exist.

Let's take the HTML from the theme-files `not-found.html`. your `not-found.jsx` file should look like this:

```js
import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <section className='bg-blue-50 min-h-screen flex-grow'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <div className='flex justify-center'>
            <FaExclamationTriangle className='text-yellow-400 text-8xl fa-5x' />
          </div>
          <div className='text-center'>
            <h1 className='text-3xl font-bold mt-4 mb-2'>Page Not Found</h1>
            <p className='text-gray-500 text-xl mb-10'>
              The page you are looking for does not exist.
            </p>
            <Link
              href='/'
              className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded'
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div className='flex-grow'></div>
    </section>
  );
};
export default NotFoundPage;
```

We changed the `class` to `className` and added the `import Link from 'next/link';` and the `import { FaExclamationTriangle } from 'react-icons/fa';` at the top of the file.

Then we replaced the `<i>` with the icon and used the `Link` component to link back to the home page.

That's it. very simple.

## Custom Loading Page

In Next.js, we can create a custom loading page by creating an `app/loading.jsx` file. This will be used while the page is loading. We can use this to show a spinner or a progress bar.

Let's create a `Loading` component in the `app/loading.jsx` file:

```js
const Loading = () => {
  return <p>Loading...</p>;
};
```

Now when you refresh the page, you will see the loading component.

## React Spinners

Let's install the [React Spinners](https://www.npmjs.com/package/react-spinners) package:

```bash
npm install react-spinners
```

Add the following to the `app/loading.jsx` file:

```js
'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const loading = ({loading}) => {
  return (
    <ClipLoader
      color='#3B82F6'
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label='Loading Spinner'
    />
  );
};
export default loading;
```

We are using the `ClipLoader` component from the `react-spinners` package. We are also using the `cssOverride` prop to override the default styles. Anytime this page shows, we want the spinner to be spinning, so we set the `loading` prop to `true`.

Now you should see a nice looking spinner while the page is loading.

