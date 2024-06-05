# Google Profile Image

Now that we can authenticate with Google, we can use the user's profile image to display it in our application.

You should be logged in. Add a console.log in the `Navbar` function:

```jsx
console.log(session);
```

You should see something like this in the console:

```jsx
{
  expire: "2024-xx-xxTxx:xx:xx.xxxZ"
  user: {
    email: "your@email.com",
    id: "xxxxxxxxxxxxxxxxxxxxxxxx",
    image: "https://lh3.googleusercontent.com/xxx",
    name: "Your Name"
  }
}
```

## Add the image domain to the allowed domains

In order to use the image, we need to add the domain to the config object `images.remotePatterns` array in the `next.config.js` file:

```js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
    ],
  },
};
```

Delete the console log.

Let's add the image to the `Navbar` component. Create a variable under where you initialized the `session` variable:

```jsx
const profileImage = session?.user?.image;
```

The question marks are optional chaining. It allows you to access nested properties without having to check if the parent property exists.

Replace the `<Image />` component with the following:

```jsx
<Image
  className='h-8 w-8 rounded-full'
  src={profileImage || profileDefault}
  width={40}
  height={40}
  alt=''
/>
```

It will look for a profile image, if it doesn't find one, it will use the default image.
