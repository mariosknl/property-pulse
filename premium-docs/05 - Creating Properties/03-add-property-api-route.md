# Add Property API Route

We have our form displayed and we added the state. Now we need somewhere to submit it to. Let's create a new route for that.

Open the file `app/api/properites/route.js` and add the following code:

```js
export const POST = async (request) => {
  try {
    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 201,
    });
  } catch (error) {
    return new Response('Failed to add property', { status: 500 });
  }
};
```

We are sticking to RESTful API conventions here. We are using the `POST` method to create a new resource. We are returning a 201 status code for success and a 500 status code for failure.

Add the form action, method and encType to the form in `components/PropertyAddForm.jsx`:

```html
<form
  action="/api/properties"
  method="POST"
  enctype="multipart/form-data"
></form>
```

Now try submitting the form. You should see a success message.

## Getting the Form Data

We need to get the form data from the request. All of the fields should have a `name` attribute. We can use the `formData` API to get the data from the request.

Let's try and get the property name. Add the following code to the `POST` function just above the success response:

```js
const formData = await request.formData();
console.log(formData.get('name'));
```

Submit the form and you should see the property name in the terminal.

Delete the console log.

For the images and amenities, we need to get all of the values as an array. Add the following code:

```js
// Access all values for amenities and images
const amenities = formData.getAll('amenities');
const images = formData.getAll('images').filter((image) => image.name !== '');

console.log(amenities);
console.log(images);
```

I added the `filter` method to remove the image item if no image was selected. By default, the form will send an empty string if no image is selected. This will cause an error when we try to upload the image to Cloudinary. So we need to remove it from the array.

Try selecting multiple amenities and images and submitting the form. You should see the arrays in the terminal.

Delete the console logs.

Now we want to build an object that ultimately will be submitted to the database. Add the following code:

```js
// Create the propertyData object with embedded seller_info
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
  images,
};

console.log(propertyData);
```

When you submit the form, you should see the property data in the terminal.

