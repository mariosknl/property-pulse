# Pagination Component

Our pagination is working, but we have no way to navigate between pages. Let's add a pagination component to our UI.

Create a new file at `components/Pagination.jsx` and add the following code for now:

```javascript
const Pagination = () => {
  return <div className='mt-10'>Pagination</div>;
};
export default Pagination;
```

Now import it into the `components/Properties` component and add it to the UI. Put it above the last closing `div` tag.

```javascript
<section className='px-4 py-6'>
  <div className='container-xl lg:container m-auto px-4 py-6'>
    <h1 className='text-2xl mb-4'>Browse Properties</h1>
    {properties.length === 0 ? (
      <p>No properties found</p>
    ) : (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {properties.map((property, index) => (
          <PropertyCard property={property} key={index} />
        ))}
      </div>
    )}
    <Pagination />
  </div>
</section>
```

Let's pass the three props to the `Pagination` component.

```javascript
<Pagination page={page} pageSize={pageSize} totalItems={totalItems} />
```

## `handlePageChange` Function

In the `Properties` component is where we will change the page. Add the following function to the `Properties` component right above the return.

```javascript
const handlePageChange = (newPage) => {
  setPage(newPage);
};
```

Pass the function to the `Pagination` component.

```javascript
<Pagination
  page={page}
  pageSize={pageSize}
  totalItems={totalItems}
  onPageChange={handlePageChange}
/>
```

## Pagination Display

Add the following to the `Pagination` component to display the current page and total number of pages and the buttons to navigate between pages. We will also have to pass in a function that will be called when the page changes.

```javascript
const Pagination = ({ page, pageSize, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className='mt-10 flex justify-center items-center'>
      <button
        className='mr-2 px-2 py-1 border border-gray-300 rounded'
        disabled={page === 1}
      >
        Previous
      </button>
      <span className='mx-2'>
        Page {page} of {totalPages}
      </span>
      <button
        className='ml-2 px-2 py-1 border border-gray-300 rounded'
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
```

We also set the prev button to be disabled if the current page is 1 and disabled the next button if the current page is the last page.

## Button Functionality

We need to add functionality to the buttons to navigate between pages. Add a handler to both buttons to increment and decrement the page number.

```javascript
<button
  className='mr-2 px-2 py-1 border border-gray-300 rounded'
  onClick={() => handlePageChange(page - 1)}
  disabled={page === 1}
>
  Previous
</button>
<span className='mx-2'>
  Page {page} of {totalPages}
</span>
<button
  className='ml-2 px-2 py-1 border border-gray-300 rounded'
  onClick={() => handlePageChange(page + 1)}
  disabled={page === totalPages}
>
  Next
</button>
```

Create the `handlePageChange` function in the `Pagination` component.

```javascript
const handlePageChange = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages) {
    onPageChange(newPage);
  }
};
```

This will call the `onPageChange` function with the new page number if it is within the range of the total number of pages. Then the `handlePageChange` function will be called in the `Properties` component and the `page` state will be updated.

Let's change the default value of the `pageSize` to 9 in the `Properties` component.

```javascript
const [pageSize, setPageSize] = useState(9);
```

We can still see the pagination component even if there are no properties. We should only show the pagination component if there are properties to paginate. Add a conditional rendering to the `Pagination` component.

```javascript
{
  totalItems > pageSize && (
    <Pagination
      page={page}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={handlePageChange}
    />
  );
}
```

This will only show the pagination component if there are more properties than the page size.
