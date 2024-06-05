# Update Property API Route

We have our form and the existing data in it. Now we need to submit the form and update the property. We will do this with a PUT request to the API.

Open the `app/api/properties/[id]/route.js` and add a `PUT` method under the `DELETE` method. Also, add a second parameter to the `PUT` method called `params`. This will be an object that contains the `id` of the property.

```js
// PUT /api/properties/:id
export const PUT = async (request, { params }) => {};
```

Now open the file `app/api/properties/route.js` and copy everything from the `POST` method and paste it into the `PUT` method.

Remember, we are not handling images here, so we need to do the following:

- Remove the cloudinary import.
- Remove the `images` variable that holds the form data.
- Remove the `images` field from the `propertyData` object.
- Remove all of the promise code that handles the image upload.

We need to get the id from the `params` object. Add this under the `await connectDB()` line:

```js
const { id } = params;
```

We also need to make sure that the user that is updating the property is the owner. Bring in the `getSessionUser` function from the `utils/getSessionUser.js` file.

```js
import { getSessionUser } from '@/utils/getSessionUser';
```

Then add the following code under the `const { id } = params;` line:

```js
const { userId } = await getSessionUser();
```

This will get the user id from the session. We will use this to check if the user is the owner of the property.

Add the folliowing code under the `const { userId } = await getSessionUser();` line:

```js
// Fetch the existing property's data
const existingProperty = await Property.findById(id);

// Check if the user is the owner of the property
if (existingProperty.owner.toString() !== userId) {
  return new Response('Unauthorized', { status: 401 });
}
```

This simply checks if the user id in the form data matches the owner id of the property. If not, we return a 401 status code.

In the `propertyData` object, we need to remove the `images` field and make sure the `owner` field is set to the `userId` from the session.

Under the `propertyData` variable replace this code:

```js
// Create a new property with the propertyData object
const newProperty = new Property(propertyData);
await newProperty.save();

return Response.redirect(
  `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
);
```

With this code:

```js
// Update the property with the propertyData object
await Property.findByIdAndUpdate(id, propertyData);

return new Response('Property Updated', { status: 200 });
```

So we are no longer redirecting from the API route. We are simply updating the property and returning a 200 status code. Then we do the redirect in the `handleSubmit` function in the edit property page.

The final code should look like this (excluding other routes):

```js
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;
    const { userId } = await getSessionUser();
    const formData = await request.formData();

    // Access all values for amenities
    const amenities = formData.getAll('amenities');

    // Fetch the existing property's data
    const existingProperty = await Property.findById(id);

    // Check if the user is the owner of the property
    if (existingProperty.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Create the propertyData object with updated values
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

    // Update the property with the propertyData object
    await Property.findByIdAndUpdate(id, propertyData);

    return new Response('Property Updated', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to edit property', { status: 500 });
  }
};
```

## `handleSubmit` Function

Open the `app/properties/[id/edit` page. Replace the `handleSubmit` function with the following:

```jsx
// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(e.target);

    const res = await fetch(`/api/properties/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (res.status === 200) {
      router.push(`/properties/${id}`);
    } else if (res.status === 401 || res.status === 403) {
      toast.error('Permission denied');
    } else {
      toast.error('Something went wrong');
    }
  } catch (error) {
    toast.error('Error updating property:', error);
  }
};
```

We are using the `FormData` API to get the form data and then we are sending it to the server with a PUT request. If the request is successful, we redirect to the property page. If not, we show an error message. We are checking for a 401 or 403 status code and showing a permission denied message if we get one of those. This is because in the API route, we need to make sure that the user editing the property is the owner of the property. If not, we return a 401 status code.

In the next lesson, we will create the API route to handle the update.

Now try updating a property. You should see the property data update in the database and you should be redirected to the property page.

