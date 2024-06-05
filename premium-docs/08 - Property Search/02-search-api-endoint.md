# Search API Endpoint

Let's create the endpoint to handle the search request.

Create a new file at `app/api/properties/search/route.js` and add the following code:

```js
import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/search
export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');

    console.log('location:', location);
    console.log('propertyType:', propertyType);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
```

For now, we are just getting the `location` and `propertyType` from the query string, console logging them and returning a success message. Make sure that this works by visiting `http://localhost:3000/api/properties/search?location=Boston&propertyType=All` in your browser or just loading the search results page.

## Fetch Properties

Now we have to get the properties from the database based on the search criteria. I want to match the location filed to any of the following fields in the database:

- name
- description
- street
- city
- state
- zipcode

We will create a patter using regular expressions to match the location with any of the fields.

Just under where we check for the `location` and `propertyType`, add the following code:

```js
// Create a regex pattern for location search
const locationPattern = new RegExp(location, 'i');
```

This is a very simple pattern that will match the location with any of the fields in the database. It is case insensitive.

Now let's create a query to get the properties from the database. Add the following code after the `locationPattern`:

```js
// Create a query to search for properties
let query = {
  $or: [
    { name: locationPattern },
    { description: locationPattern },
    { 'location.street': locationPattern },
    { 'location.city': locationPattern },
    { 'location.state': locationPattern },
    { 'location.zipcode': locationPattern },
  ],
};
```

We are checking all of the fields in the database to see if any of them match the location.

If the `propertyType` is not `All`, we will add it to the query. Add the following code after the `query`:

```js
// Only check for property type if it's not 'All'
if (propertyType && propertyType !== 'All') {
  const typePattern = new RegExp(propertyType, 'i');
  query.type = typePattern;
}
```

Now let's make the actual query to the database and respond with the results:

```js
const properties = await Property.find(query);

return new Response(JSON.stringify(properties), {
  status: 200,
});
```

Now you can test by visiting a url such as `http://localhost:3000/api/properties/search?location=Boston&propertyType=All` in your browser or HTTP client.

Next we will create the search results page.
