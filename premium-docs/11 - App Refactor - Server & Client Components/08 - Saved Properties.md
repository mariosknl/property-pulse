# Saved Properties

Now, let's make the saved properties page server-rendered. Just like we have been doing, we will remove anything to do with `useState`, `useEffect`, and the `Spinner` component. We will also remove the `use client` at the top.

Here are the new imports:

```javascript
import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
```

Here is the rest of the code for this page:

```javascript
const SavedPropertiesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  const { bookmarks } = await User.findById(userId)
    .populate('bookmarks')
    .lean();

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default SavedPropertiesPage;
```

You can delete the following:

- The `app/api/bookmarks/check` folder and the `route.js` file inside it.
