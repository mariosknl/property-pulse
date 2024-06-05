# Form Input Handlers

We have our form displayed. Before we start working on the API route, we need to handle the change handlers.

### handleChange Function

We need a function that will set the state when the value changes. We do have some nested objects in the state, so we need to account for that. Add the following function just above the `return` statement:

```jsx
const handleChange = (e) => {
  const { name, value } = e.target;

  // If the field is a nested property (e.g., rates.weekly),
  // update it correctly using spread and object destructuring.
  if (name.includes('.')) {
    const [outerKey, innerKey] = name.split('.');

    setFields((prevFields) => ({
      ...prevFields,
      [outerKey]: {
        ...prevFields[outerKey],
        [innerKey]: value,
      },
    }));
  } else {
    // If it's a top-level property, update it directly.
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  }
};
```

The function handleChange takes an event object e as a parameter, representing the change event triggered by the user input (e.g., typing in an input field).

1. It extracts the name and value properties from the event target using object destructuring. The name corresponds to the name attribute of the input field, and the value corresponds to the current value entered by the user.

2. It checks if the name includes a dot (.). If it does, it assumes that the field is a nested property (e.g., rates.weekly) that needs to be updated correctly.

3. If the name includes a dot, it splits the name into outerKey and innerKey using split('.'). This allows the function to update nested properties correctly.

4. It uses the functional form of setFields (a state updater function) to update the state. It spreads the previous state (prevFields) to ensure immutability and then updates the specified nested property using object destructuring and spread syntax.

5. If the name does not include a dot, it means that the field is a top-level property. In this case, it directly updates the state by spreading the previous state (prevFields) and updating the specified property ([name]: value).

6. Finally, the function returns the updated state using setFields.

You can check your React devtools to see the state change as you type in the fields.

### handleAmenitiesChange Function

Amenities and images will be a bit different. We will use a separate function for them. Add the following function just above the `return` statement:

```jsx
const handleAmenitiesChange = (e) => {
  const { value, checked } = e.target;

  // Clone the current amenities array
  const updatedAmenities = [...fields.amenities];

  if (checked) {
    // If the checkbox is checked, add the value to the array
    updatedAmenities.push(value);
  } else {
    // If the checkbox is unchecked, remove the value from the array
    const index = updatedAmenities.indexOf(value);
    if (index !== -1) {
      updatedAmenities.splice(index, 1);
    }
  }

  // Update the state with the updated array of amenities
  setFields((prevFields) => ({
    ...prevFields,
    amenities: updatedAmenities,
  }));
};
```

This code defines a function handleAmenitiesChange responsible for updating state based on changes in a checkbox input field related to amenities. Let's break it down step by step:

1. The function handleAmenitiesChange takes an event object e as a parameter, representing the change event triggered by the checkbox input.

2. It extracts the value and checked properties from the event target using object destructuring. value represents the value attribute of the checkbox, and checked indicates whether the checkbox is checked or unchecked.

3. It clones the current amenities array from the state using the spread operator ...fields.amenities. This ensures immutability and prevents direct mutation of the state.

4. If the checkbox is checked (checked === true), it adds the value to the cloned updatedAmenities array using the push method.

5. If the checkbox is unchecked (checked === false), it finds the index of the value in the updatedAmenities array using indexOf. If the index is found (index !== -1), it removes the value from the array using splice.

6. After updating the updatedAmenities array based on checkbox changes, it updates the state by calling the functional form of setFields. It spreads the previous state (prevFields) and updates the amenities property with the updatedAmenities array.



Now check the React devtools. You should see the `amenities` array updating as you check and uncheck the boxes.

### handleImagesChange Function

We will use a similar function for the `images` field. Add the following function just above the `return` statement:

```jsx
const handleImageChange = (e) => {
  const { files } = e.target;

  // Clone the current images array
  const updatedImages = [...fields.images];

  // Add the new files to the array
  for (const file of files) {
    updatedImages.push(file);
  }

  // Update the state with the updated array of images
  setFields((prevFields) => ({
    ...prevFields,
    images: updatedImages,
  }));
};
```


1. The function handleImageChange takes an event object e as a parameter, representing the change event triggered by the file input.

2. It extracts the files property from the event target using object destructuring. files represents an array-like object containing the selected files.

3. It clones the current images array from the state using the spread operator ...fields.images. This ensures immutability and prevents direct mutation of the state.

4. It iterates over each file in the files array using a for...of loop.

5. Inside the loop, it pushes each file to the cloned updatedImages array.

6. After adding all new files to the updatedImages array, it updates the state by calling the functional form of setFields. It spreads the previous state (prevFields) and updates the images property with the updatedImages array.

Now we are ready to work on the API route.
