# Mapbox Map

The next thing that I want to do is add a map to the property page. We are going to use a library called [Mapbox](https://www.mapbox.com/). Mapbox is a mapping platform that allows you to create custom maps and integrate them into your applications. It is free to use for up to 50,000 map views per month. If you need more than that, you can pay for a subscription.

## Create a Mapbox Account & Get an Access Token

To get started, you will need to create a Mapbox account. Go to [Mapbox.com](https://www.mapbox.com/) and click the "Sign Up" button in the top right corner. You can sign up with your GitHub account or with your email address. Once you have signed up, go to your account page and get your access token. You will need this to use Mapbox in your application.

Add the token to your `.env` file. It will look something like this:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiYnRyYedededdiYSI6ImNscno0amd5MTFofLQyam81NXd1ZjUxa3MifQ.nn5Y_FIbzaPCkgjmGJ7CyQ
```

## Google Geocoding API

We will also be using the Google Geocoding API to convert the address that the user enters into latitude and longitude coordinates. To use the Google Geocoding API, go to your cloud console. We have already been using Google for authentication, so you should be somewhat familiar with the cloud console.

Go to `APIs & Services` > `Library` and search for `Geocoding API`. Click on the `Geocoding API` result and then click the `Enable` button. You will need to create a billing account to use the Geocoding API. You will get $200 in free credits every month, so you shouldn't have to pay anything. Once you have enabled the Geocoding API, go to `APIs & Services` > `Credentials` and create a new API key.
You can restrict the API key so that you can use it in the client. I am going to keep it simple and not restrict it, but before you deploy, it may be a good idea to restrict it to your domain or the server IP address.

Now click on `Enable APIs`.

Once you have created the API key, add it to your `.env` file. It will look something like this:

```bash
NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY=AIzaSyD-9tSrke72dOuMnMX-a7eZSW0jkFMBWY
```

## Dependencies

We will be installing 2 packages: `react-map-gl` and `react-geocode`.

```bash
npm install react-map-gl mapbox-gl react-geocode
```

## MapboxMap Component

Create a new file at `components/PropertyMap.jsx` and add the following code:

```jsx
const PropertyMap = ({ property }) => {
  return <div>PropertyMap</div>;
};

export default PropertyMap;
```

Now import the `PropertyMap` component into `pages/properties/[id]/page.jsx` and add it to the page:

```jsx
import PropertyMap from '@/components/PropertyMap';
```

Replace the `<div>Map</div>` with the `PropertyMap` component:

```jsx
<PropertyMap property={property} />
```

Let's go back to the `PropertyMap` component and add the imports:

```jsx
import { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
import { setDefaults, fromAddress } from 'react-geocode';
import Spinner from './Spinner';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
```

We are importing `useEffect` and `useState` from React. We are importing the `Map` and `Marker` components from `react-map-gl`. We are importing the `setDefaults` and `fromAddress` functions from `react-geocode`. We are importing the `Spinner` component that we created earlier. We are importing the `Image` component from Next.js. We are importing the `pin` image.

You can get the `pin.svg` image from the theme files or the final project files.

Let's add our state:

```jsx
const [lat, setLat] = useState(null);
const [lng, setLng] = useState(null);
const [viewport, setViewport] = useState({
  latitude: 0,
  longitude: 0,
  zoom: 12,
  width: '100%',
  height: '500px',
});
const [loading, setLoading] = useState(true);
```

We have the latitude, longitude, viewport, and loading state.

Now we need to use the geocoder to get the latitude and longitude from the address. We need to initialize our API token first. So add this below the state values:

```jsx
setDefaults({
  key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
  language: 'en',
  region: 'us',
});
```

Now in the `useEffect` hook, we will use the `fromAddress` function to get the latitude and longitude from the address:

```jsx
useEffect(() => {
  const fetchCoordinates = async () => {
    const res = await fromAddress(
      `${property.location.street} ${property.location.city}, ${property.location.state} ${property.zip}`
    );
    const { lat, lng } = res.results[0].geometry.location;
    setLat(lat);
    setLng(lng);
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: lng,
    });

    setLoading(false);
  };
  fetchCoordinates();
}, []);
```

Next, let's load a spinner while the map is loading:

```jsx
if (loading) return <Spinner loading={loading} />;
```

Then we want to return a map if the loading is false:

```jsx
return (
  !loading && (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapLib={import('mapbox-gl')}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 15,
      }}
      style={{ width: '100%', height: 500 }}
      mapStyle='mapbox://styles/mapbox/streets-v9'
    >
      <Marker longitude={lng} latitude={lat} anchor='bottom'>
        <Image src={pin} alt='location' width={40} height={40} />
      </Marker>
    </Map>
  )
);
```

We are passing the `mapboxAccessToken` prop to the `Map` component. We are passing the `mapLib` prop to the `Map` component. We are passing the `initialViewState` prop to the `Map` component. We are passing the `style` prop to the `Map` component. We are passing the `mapStyle` prop to the `Map` component. We are passing the `longitude` and `latitude` props to the `Marker` component. We are passing the `anchor` prop to the `Marker` component. We are passing the `src`, `alt`, `width`, and `height` props to the `Image` component.

You should now see a map on the property page. In the next lesson we will handle geocode errors.
