# Implement Pagination

Now we are going to implement pagination.

## API Route

Let's start by modifying the API route to accept a `page` and `pageSize` query parameter. Open the file at `app/api/properties/route.js` and modify the `GET` method to accept these query parameters:

```javascript
// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const page = request.nextUrl.searchParams.get('page') || 1;
    const pageSize = request.nextUrl.searchParams.get('pageSize') || 9;

    const skip = (page - 1) * pageSize;

    const totalProperties = await Property.countDocuments({});
    const properties = await Property.find({}).skip(skip).limit(pageSize);

    const result = {
      total: totalProperties,
      properties,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
```

We are getting the `page` and `pageSize` query parameters from the `nextUrl` property of the `request` object. If they are not provided, we default to `1` and `3` respectively. We then calculate the `skip` value by multiplying the `page` by the `pageSize` and subtracting `1`. We then use the `skip` and `limit` methods to paginate the properties.

We also need to get the total properties so we can calculate the total number of pages. We use the `countDocuments` method to get the total number of properties.

Then we return an object with the total number of properties and the properties for the current page.

Since we are now returning an object with the total number of properties and the properties, we need to update the client to handle this new response.

Change this line in the `components/Properties.jsx` file:

```javascript
setProperties(data);
```

to:

```javascript
setProperties(data.properties);
```

Now on the `/properties` page, you should only see 3 listings or whatever you set the `pageSize` to be by default. Let's make it 9 or whatever you want to use as the default:

```javascript
const pageSize = request.nextUrl.searchParams.get('pageSize') || 9;
```

## Update Homepage Object

We need to now account for the change in the response object in the homepage.

Open the `app/page.jsx` file and change the following code:

```javascript
const HomePage = async () => {
  const properties = await fetchProperties();

  const randomProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);
  // ...
};
```

To this:

```javascript
const HomePage = async () => {
  const data = await fetchProperties();

  const randomProperties = data.properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);
  // ...
};
```

## Client Component

Now in the `components/Properties` component and add a couple of new state variables:

```javascript
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(3);
const [totalItems, setTotalItems] = useState(0);
```

We will set page size to 3 for now so we can see the pagination in action. We will change this to 9 later.

Now, change your request to fetch the properties to include the `page` and `pageSize` query parameters. Let's also update the `totalItems` state with the total number of properties from the API response:

```javascript
useEffect(() => {
  const fetchProperties = async () => {
    try {
      const res = await fetch(
        `/api/properties?page=${page}&pageSize=${pageSize}`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setProperties(data.properties);
      setTotalItems(data.total);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  fetchProperties();
}, [page, pageSize]);
```

We als added the `page` and `pageSize` state variables to the dependency array of the `useEffect` hook so that the properties are fetched whenever the page or page size changes:

So our pagination is working by changing the hardcoded default values. Now we just need to add the buttons to the UI. We will do that next.
