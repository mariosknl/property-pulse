# Display Messages

Now we need to display the messages on the page in the `MessagesPage` component.

## Message Component

Let's put the actual message in its own component. Create a file at `components/Message.jsx` and cut the message markup and put it into the new file. It should look like this:

```jsx
const Message = ({ messages }) => {
  return (
    <div className='bg-white p-4 rounded-md shadow-md border border-gray-200'>
      <p className='text-gray-700'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
        libero nobis vero quos aspernatur nemo alias nam, odit dolores sed
        quaerat illum impedit quibusdam officia ad voluptatibus molestias sequi
        Repudiandae!
      </p>

      <ul className='mt-4'>
        <li>
          <strong>Name:</strong> John Doe
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href='mailto:recipient@example.com' className='text-blue-500'>
            {' '}
            recipient@example.com
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href='tel:123-456-7890' className='text-blue-500'>
            {' '}
            123-456-7890
          </a>
        </li>
      </ul>
      <button className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'>
        Mark As Read
      </button>
      <button className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'>
        Delete
      </button>
    </div>
  );
};
export default Message;
```

Now import it into the `MessagesPage` component and use it like this:

```jsx
import Message from '@/components/Message';

const MessagesPage = () => {
  const messages = await fetchMessages();

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

          <div className='space-y-4'>
            <Message />
          </div>
        </div>
      </div>
    </section>
  );
};
export default MessagesPage;
```

You can delete the console log.

## Displaying Messages

We need to now display the messages that we fetched from the server. We'll use the `map` function to loop through the messages and display them. Replace the `Message` component with the following:

```jsx
const MessagesPage = async () => {
  const messages = await fetchMessages();

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

          <div className='space-y-4'>
            {messages.length > 0 ? (
              messages.map((message) => (
                <Message key={message._id} message={message} />
              ))
            ) : (
              <p>You have no messages.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
```

You should see the messages displayed on the page now, however it is just the same message repeated. We need to use the `message` prop in the `Message` component. Replace the `Message` component with the following:

```jsx
const Message = ({ message }) => {
  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
      <h2 className='text-xl mb-4'>
        {' '}
        <span className='font-bold'>Property Inquiry:</span> {message.property.name}
      </h2>
      <p className='text-gray-700 text-lg'>{message.body}</p>

      <ul className='mt-4'>
        <li>
          <strong>Name:</strong> {message.name}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href='mailto:recipient@example.com' className='text-blue-500'>
            {' '}
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${message.phone}`} className='text-blue-500'>
            {' '}
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{' '}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'>
        Mark As Read
      </button>
      <button className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'>
        Delete
      </button>
    </div>
  );
};
export default Message;
```

Now you should see the actual data from the messages displayed on the page.

Let's also add the `/messages` route to the `middleware.js` file along with the `properties/saved` route. It should look like this:

```javascript
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
};
```
