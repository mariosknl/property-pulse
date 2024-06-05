# File Based Routing

When we build a SPA (Single Page Application), we typically have a single HTML file and everything including the routing is handled by JavaScript. This is great for interactivity, but it's not great for SEO. Search engines like Google are getting better at crawling JavaScript apps, but it's still not as good as a server-rendered page.

Next.js and most SSR frameworks use what is called 'file-based routing'. The convention is older versions of Next.js (12 and under) was to use the `pages` folder. You would create a file named something like `about.jsx` and then you would go to `/about` to see the page.

In Next.js 13+, we can still use the `pages` folder if you want, but the new convention is to use the `app` folder. Also, instead of creating the file `about.jsx`, we would create a folder called `about` and then create a file called `page.jsx` inside of that folder. This is the new convention and it's what I'll be using in this course.

Let's start to create some page components and see how file-based routing works.

Create a folder called `properties` in the `app` folder and add a file called `page.jsx` to that folder.

Add the following to the file:

```jsx
const PropertiesPage = () => {
  return <div>PropertiesPage</div>;
};

export default PropertiesPage;
```

Now if you go to `/properties`, you should see the text "PropertiesPage" on the page. It's that simple.

## Nested Routes

We can also create nested routes. I want to have a page for `/properties/add`. So let's create a folder called `add` inside of the `properties` folder and add a file called `page.jsx` to that folder.

Add the following to the file:

```jsx
const AddPropertyPage = () => {
  return <div>AddPropertyPage</div>;
};
export default AddPropertyPage;
```

## Dynamic Routes

Now, we won't always have a static route like `/properties` or `/properties/add`. Sometimes we'll have a dynamic route like `/properties/123` where the `123` is the id of the property. We can do this by creating a folder called `[id]` inside of the `properties` folder. Then create a file called `page.jsx` inside of that folder.

Add the following to the file:

```jsx
const PropertyPage = () => {
  return <div>PropertyPage</div>;
};
export default PropertyPage;
```

Now if you go to `/properties/123`, you should see the text "PropertyPage" on the page.

## Catch-All Routes

We can also create catch-all routes. For example, if we want to have our `PropertyPage` component to load for `/properties/123/rooms`, it won't work because it has to match exact. However, we can create a catch-all route by changing the name of the folder to `[...id]` adding three dots before the name. Now if you go to `/properties/123/rooms`, you should see the text "PropertyPage" on the page.

We don't need this to be a catch all route, so let's change it back to `[id]`. Now if you go to `/properties/123/rooms`, you should see a 404 page.

## Linking to Pages

When linking to another page on our website, we don't use the `<a>` tag. We can use the `Link` component from Next.js to do this. The reason for this is because we want to use client-side routing instead of server-side routing. This will make our app faster and more interactive.

Let's add a link on the homepage to the `PropertiesPage` component.

```jsx
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1 className='text-3xl'>Welcome</h1>
      <Link href='/properties'>Properties</Link>
    </div>
  );
};
export default HomePage;
```

Ultimately, we will have a navbar component that will have links to all of our pages. But I just wanted to show you how to use the `Link` component.

As you can see, routing with an SSR framework like Next.js is very simple
