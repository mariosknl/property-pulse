# Edit Property Page

We can create, read and delete properties. Now we need to add the ability to edit properties. Create a new file at `app/properties/[id]/edit.jsx` and add the following for now:

```jsx
const EditPropertyPage = () => {
  return <div>EditPropertyPage</div>;
};
export default EditPropertyPage;
```

The Edit button on the profile page should take you to this page.

# `PropertyEditForm`

Create a new file at `components/PropertyEditForm.jsx` and just add the following for now:

```jsx
const PropertyEditForm = () => {
  return <div>PropertyEditForm</div>;
};
export default PropertyEditForm;
```

Embed the `PropertyEditForm` component in the `EditPropertyPage` component and add the rest of the markup:

```jsx
import PropertyEditForm from '@/components/PropertyEditForm';

const EditPropertyPage = () => {
  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <PropertyEditForm />
        </div>
      </div>
    </section>
  );
};
export default EditPropertyPage;
```

## The Form

So we are going to do things a bit differently than we did with the `AddPropertyForm`. Since this is an update, we will be using a PUT request instead of a POST request. So we can not just add a method and action to the form. We need to submit with the `fetch` API. Also, I am not going to include the image upload in this form. We may do that in a later section. It's just too messy to do it here and I think I may lose some people.

Let's start by copying everything from the `AddPropertyForm` component and pasting it into the `PropertyEditForm` component. Be sure to change the name to `PropertyEditForm` in the component declaration and export.

Do the following:

- Change the heading to `Edit Property` and the button text to `Update Property`.
- Remove `images` from the `fields` state and remove the `handleImageChange` function.
- Remove the `image` input from the form.
- Remove the `encType`, `action` and `method` attribute from the form and add an `onSubmit` handler. It should be `<form onSubmit={handleSubmit}>`.

Just add an empty `handleSubmit` function above the return for now:

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
};
```

At this point, you should see the form on the page. It won't do anything yet or show any data, but it should be there.

## Getting the Property Data

Now we need do fetch the property data from the server.

Add an import for `useEffect`, `useRouter`, `useParams`, `toast` and the `fetchProperty` function. It should look like this:

```jsx
'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchProperty } from '@/app/properties/requests';
```

Now get the id from the url with the `useParams` hook and initialize the router:

```jsx
const PropertyEditForm = () => {
  // Add these 2 lines
  const { id } = useParams();
  const router = useRouter();
  // Rest of the code
```

Add a loading state and initialize it to `true`:

```jsx
const [loading, setLoading] = useState(true);
```

Now we need to add a `useEffect` hook to fetch the property data. Add the following code:

```jsx
useEffect(() => {
  // Fetch property data using your fetchProperty function
  const fetchPropertyData = async () => {
    try {
      const propertyData = await fetchProperty(id);

      // Populate the fields state with the fetched data
      setFields(propertyData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching property data:', error);
    }
  };

  fetchPropertyData();
}, []);
```

We are simply fetching the property data and populating the `fields` state with it. We are also setting the `loading` state to `false` so we can render the form.

You should now see the property data in the form, however, you may see a warning that says something about a null value. This is because the one or more of the rates is set to `null` in the property data and it is being added to an input. To fix this, in the `useEffect`, add the following under where we define `propertyData`:

```jsx
// Check and set default values for each rate if they are null
if (propertyData && propertyData.rates) {
  const defaultRates = { ...propertyData.rates };
  for (const rate in defaultRates) {
    if (defaultRates[rate] === null) {
      defaultRates[rate] = ''; // or set to a default value
    }
  }
  propertyData.rates = defaultRates;
}
```

Now that warning should go away. In the next lesson, we will create and submit to the route.
