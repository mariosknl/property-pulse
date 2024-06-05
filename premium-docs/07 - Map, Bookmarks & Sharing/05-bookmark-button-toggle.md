# Toggle Bookmark Button

We need to have the button display differently depending on if the current property is bookmarked or not. If it is bookmarked, then we want to show a button to remove the bookmark. If it is not bookmarked, then we want to show a button to add the bookmark.

We already have the state variable for `isBookmarked` in the `BookmarkButton` component. We need to set this state variable to `true` or `false` depending on if the current property is bookmarked or not.

Replace the current return with the following return statement:

return isBookmarked ? (
<button
onClick={handleClick}
className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'

>

    <FaBookmark className='mr-2' />
    Remove Bookmark

  </button>
) : (
  <button
    onClick={handleClick}
    className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
  >
    <FaBookmark className='mr-2' />
    Add Bookmark
  </button>
);
```

Now when you click the button, it will add or remove the bookmark and the button will change accordingly.


## API Route

If you reload the page, it will always show the blue button. Lets add the API route to run when the page loads to check the status. Create a file at `app/api/bookmarks/check/route.js` and add the following code:

```jsx
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find the user by their session ID
    const user = await User.findOne({ _id: userId });

    // Check if the property is already bookmarked
    const isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
```

We are getting the property id from the request body and the user from the session.

We need to check if there actually is a session first. If there is not, then we return a 401 status code.

Then we are checking if the property is already bookmarked. If it is, then we return `true`. If it is not, then we return `false`.

## Check Bookmark Status

Now we need the correct button to be displayed on page load.

Let's add a loading state to the component:

```jsx
const [loading, setLoading] = useState(true);
```

Add this above the main return statement:

```jsx
if (loading) return <p className='text-center'>Loading...</p>;
```

Add a `useEffect` hook:

```jsx
useEffect(() => {
  if (!userId) {
    setLoading(false);
    return;
  }

  const checkBookmarkStatus = async () => {
    try {
      const res = await fetch(`/api/bookmarks/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propertyId: property._id }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      // Handle fetch errors
      console.error(error);
      toast.error('Failed to check bookmark status');
    } finally {
      setLoading(false);
    }
  };

  checkBookmarkStatus();
}, [property._id, userId]);
```

We return if the user is not logged in. If they are, then we are hitting a route at `/api/bookmarks/check` to check if the current property is bookmarked or not. If it is bookmarked, then we set the `isBookmarked` state variable to `true`. If it is not bookmarked, then we set the `isBookmarked` state variable to `false`.


Now the correct button should load.
