# Sign In Button

Now that we have most of our provider setup, we can add the Google sign in button to our app.

Let's start by opening up the `src/components/Navbar.jsx` file and import a few things from Next Auth.

```jsx
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
```

So we can use the `signIn` and `signOut` functions to sign in and out of our app, and the `useSession` hook to get the current session. The `getProviders` function will give us a list of all the providers we have setup.

Let's add a `useSession` hook to our component. Add this ad the top of the component function:

```jsx
const Navbar = () => {
  const { data: session } = useSession(); // Add this line
  // ...
};
```

Now we can use the `session` variable to check if the user is signed in or not. Right now, we have a piece of state called `isLoggedIn` that we use to check if the user is logged in or not. Let's replace that with the `session` variable.

```jsx
{
  /* <!-- Right Side Menu (Logged Out) --> */
}
{
  !session && <div className='hidden sm:block sm:ml-6'>// ...</div>;
}
```

```jsx
{
  /_ <!-- Right Side Menu (Logged In) --> _/;
}
{
  session && (
    <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
      // ...
    </div>
  );
}
```

## Set Providers

Before we can add the sign in functionality, we need to get the provider ID for Google. We do that with the `getProviders` function from Next Auth. Let's add a piece of state to hold the providers. We will set it to `null` by default.

```jsx
const [providers, setProviders] = useState(null);
```

Now where we want to put the login button, we have to check if the providers are loaded. If they are, we can map over them and find the Google provider. If we find it, we can render the button.

We have two login buttons, one in the desktop menu and one in the mobile menu. So we have to do this in two areas:

```jsx
{
  /* <!-- Right Side Menu (Logged Out) --> */
}
{
  !session && (
    <div className='hidden sm:block sm:ml-6'>
      <div className='flex items-center'>
        {providers &&
          Object.values(providers).map((provider) => (
            <button className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>
              <FaGoogle className='text-white mr-2' />
              <span>Login or Register</span>
            </button>
          ))}
      </div>
    </div>
  );
}
```

```jsx
{
  /* <!-- Mobile menu, show/hide based on menu state. --> */
}
//.. Rest of menu items
{
  !session && (
    <div className='block sm:ml-6'>
      <div className='flex items-center'>
        {providers &&
          Object.values(providers).map((provider) => (
            <button className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-3'>
              <FaGoogle className='text-white mr-2' />
              <span>Login or Register</span>
            </button>
          ))}
      </div>
    </div>
  );
}
```

## Loading Providers

The button is going to disappear because we don't have any providers yet. Let's add a `useEffect` hook to load the providers when the component mounts.

```jsx
useEffect(() => {
  const setAuthProviders = async () => {
    const res = await getProviders();

    setProviders(res);
  };

  setAuthProviders();
}, []);
```

Now you should see the button again.

## Sign In

Now we can add the sign in functionality. We can do that by adding an `onClick` handler to the button. We also need to set the `key` prop on the button to the provider ID. Add both to both buttons:

```jsx
<button
  key={provider.name}
  onClick={() => signIn(provider.id)}
  className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-3'
>
  <FaGoogle className='text-white mr-2' />
  <span>Login or Register</span>
</button>
```

Now if you click the button, you should see the Google sign in page. Do not sign in yet. We want to make sure that we save the user in the database first. We will do that in the next lesson.
