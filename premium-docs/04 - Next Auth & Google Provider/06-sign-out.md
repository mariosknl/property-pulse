# Sign Out

Now that we can log in and get the user data and create a session, we need to be able to log out.

We already have the `signOut` function being imported from Next Auth. We just need to call it.

We also want to make sure that we close the profile menu when we sign out. We can do that by setting the `isProfileMenuOpen` state to `false`.

Add this to the sign out button:

```jsx
<button
  onClick={() => {
    setIsProfileMenuOpen(false);
    signOut();
  }}
  className='block px-4 py-2 text-sm text-gray-700'
  role='menuitem'
  tabIndex='-1'
  id='user-menu-item-2'
>
  Sign Out
</button>
```

That's it! You should now be able to sign out.
