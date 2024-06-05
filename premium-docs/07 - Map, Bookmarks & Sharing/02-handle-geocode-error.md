Our map works on listings with correct location info, but if the address that is entered gets no results we will have a never ending spinner. We need to handle this case.

Add a new piece of state to the `PropertyMap.jsx` component:

```jsx
const [geocodingError, setGeocodingError] = useState(false);
```

In the `useEffect` hook, we will add a try/catch block and set the `geocodingError` state to true if there is an error:

```jsx
useEffect(() => {
  const fetchCoordinates = async () => {
    try {
      const response = await fromAddress(
        `${property.location.street} ${property.location.city}, ${property.location.state} ${property.zip}`
      );

      if (response.results.length === 0) {
        // No results found, handle this case
        setGeocodingError(true);
        setLoading(false);
        return;
      }

      const { lat, lng } = response.results[0].geometry.location;
      setLat(lat);
      setLng(lng);
      setViewport({
        ...viewport,
        latitude: lat,
        longitude: lng,
      });

      setLoading(false);
    } catch (error) {
      // Handle any errors that occur during geocoding
      console.error('Geocoding error:', error);
      setGeocodingError(true);
      setLoading(false);
    }
  };
  fetchCoordinates();
}, []);
```

Under where we check for loading and set the spinner, add the following:

```jsx
if (geocodingError) {
  // Handle the case where geocoding failed to find results
  return <div>No location data available.</div>;
}
```

Now you can test by adding a new property and adding gibberish for the location. You should see the error message.
