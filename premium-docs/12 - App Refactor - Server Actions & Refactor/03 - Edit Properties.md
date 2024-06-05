# Edit Properties

Now let's make the edit form work with an action. We already have the code we need in the `app/properties/[id]/edit/page.jsx` file. Now we need to open the form component at `app/components/PropertyEditForm.jsx` and add an action to it.

Let's create an update action in a new file at `app/actions/updateProperty.js`.

We are basically just moving the logic from the api route to the action file. Add the following:

```javascript
'use server';

import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function updateProperty(propertyId, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);

  // Verify ownership
  if (existingProperty.owner.toString() !== userId) {
    throw new Error('Current user does not own this property.');
  }

  // Access all values from amenities and images
  const amenities = formData.getAll('amenities');

  // Create propertyData object for database
  const propertyData = {
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly.'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
    owner: userId,
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  // Revalidate the cache
  // NOTE: since properties are pretty much on every page, we can simply
  // revalidate everything that uses our top level layout
  revalidatePath('/', 'layout');

  redirect(`/properties/${updatedProperty._id}`);
}

export default updateProperty;
```

Now we need to update the `PropertyEditForm` component to use this action. Open the `app/components/PropertyEditForm.jsx` file and add the following:

```javascript
import updateProperty from '@/app/actions/updateProperty';
```

This is a bit confusing, but to pass the id to our server action we can us Function.bind. This is a way to bind the id to the function so that it is passed as the first argument.

You can read more here:

https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#passing-additional-arguments

Add this right above the return statement in the `PropertyEditForm` component:

```javascript
const updatePropertyById = updateProperty.bind(null, property._id);
```

Now add it to the action attribute of the form:

```javascript
 <form action={updatePropertyById}>
```

Now you should be able to update your property and be redirected to the property page.

You can now delete the following:

- The PUT request in the `app/api/properties/[id]/route.js` file.
