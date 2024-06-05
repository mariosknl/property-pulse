# Deleting Properties

Now we want to be able to delete property listings from the profile page. There is already a delete button and a handler. Let's create the API route before anything.

## API Route

We already have the file. Open the `app/properties/[id]/route.js` file. You should have the `GET` method already. Now let's add the `DELETE` method.

We need to verify the user that owns the listing is the user from the session. let's use our utility function to get the user id from the session. Add the following code to the top of the file:

```js
import { getSessionUser } from '@/utils/getSessionUser';
```

Then add the following `DELETE` method:

```js
// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property) return new Response('Property Not Found', { status: 404 });

    // Verify ownership
    if (property.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Delete property
    await property.deleteOne();

    return new Response('Property Deleted', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
```

We are connecting to the database, getting the session and property and making sure that they both exist. Then we are verifying that the user owns the property. If they do, we delete the property and return a success message. If not, we return an unauthorized message.

## Make the Request

Add this to the delete handlet in the `app/properties/[id]/page.jsx` file:


```jsx
const handleDeleteProperty = async (propertyId) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this property?'
  );

  if (!confirmed) {
    return;
  }

  try {
    const res = await fetch(`/api/properties/${propertyId}`, {
      method: 'DELETE',
    });

    if (res.status === 200) {
      // Remove property from state
      const updateProperties = properties.filter(
        (property) => property._id !== propertyId
      );
      setProperties(updateProperties);

      console.log('Property deleted');
    } else {
      console.error('Failed to delete property');
    }
  } catch (error) {
    console.error(error);
  }
};
```

We first confirm the user wants to proceed, then we are making the request and removing the property from the state to reflect in the UI.

Try it out. I would suggest just creating a new junk listing to delete rather than deleting one of the sample listings.

The listing should go away and you should see a message in the console.

In the next video, we are going to add toast notifications to the profile page so that we can show success and error messages to the user.
