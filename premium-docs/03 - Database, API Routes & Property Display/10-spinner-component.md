# Spinner Component

The single property page is a client component that fetches data. The spinner from the `loading.jsx` component is used for server side rendering. We will create a new spinner component that will be used for client side rendering.

Create a file at `app/components/Spinner.jsx` with the following contents:

```jsx
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({ loading }) => {
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
export default Spinner;
```

We are using the `react-spinners` library to create the spinner. We are also using the `cssOverride` prop to center the spinner on the page.

Open the `app/properties/[id]/page.jsx` file and import the `Spinner` component:

```js
import Spinner from '@/components/Spinner';
```

Add the `Spinner` component in place of the `Loading...`:

```jsx
   {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className='bg-blue-50'>
     // ...
```

Now you should see a spinner on the page while it's loading.
