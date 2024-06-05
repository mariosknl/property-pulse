# Deleting Properties

Now we are going to make the delete work again by adding an action.

The delete button is in the `app/components/ProfileProperties.jsx` file. Open that up and also create the action file `app/actions/deleteProperty.js`.

In the actions file, add the following:

```javascript
'use server';

import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  // Check for session
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  await connectDB();

  const property = await Property.findById(propertyId);

  if (!property) throw new Error('Property Not Found');

  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  // extract public id's from image url in DB
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split('/');
    return parts.at(-1).split('.').at(0);
  });

  // Delete images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy('propertypulse/' + publicId);
    }
  }

  // Proceed with property deletion
  await property.deleteOne();

  // Revalidate the cache
  // NOTE: since properties are pretty much on every page, we can simply
  // revalidate everything that uses our top level layout
  revalidatePath('/', 'layout');
}

export default deleteProperty;
```

We are moving the logic from the API route to this action file.

Now in the `ProfileProperties.jsx` file, add the following:

```javascript
import deleteProperty from '@/app/actions/deleteProperty';
```

Add an onClick event to the delete button:

```javascript
<button
  onClick={() => handleDeleteProperty(property._id)}
  className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
  type='button'
>
  Delete
</button>
```

Create the `handleDeleteProperty` function:

```javascript
const handleDeleteProperty = async (propertyId) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this property?'
  );

  if (!confirmed) return;

  const deletePropertyById = deleteProperty.bind(null, propertyId);

  await deletePropertyById();

  toast.success('Property Deleted');

  const updatedProperties = properties.filter(
    (property) => property._id !== propertyId
  );

  setProperties(updatedProperties);
};
```

Now you should be able to delete your properties.

You can now delete the following:

- The entire `app/api/properties` folder. Everything is now in actions and server components.
