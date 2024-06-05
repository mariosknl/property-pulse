# Messages Page

Right now, we have nothing in the `app/messages/page.jsx` except an embedded `<Messages />` component. In that component, we make a request to the api route to get the user messages.

We are going to remove the entire `Messages` component and replace it with a server-rendered page.

In the `app/messages/page.jsx` file, remove the `Messages` component and replace it with the following imports:

```javascript
import MessageCard from '@/components/Message';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';
```

Here is our new code:

```javascript
const MessagePage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 }) // Sort read messages in asc order
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 }) // Sort read messages in asc order
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  // Convert to serializable object so we can pass to client component.
  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializeableObject(messageDoc);
    message.sender = convertToSerializeableObject(messageDoc.sender);
    message.property = convertToSerializeableObject(messageDoc.property);
    return message;
  });

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

          <div className='space-y-4'>
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default MessagePage;
```

We are just getting the messages directly from the component rather than hitting an API route.

You can now delete the following:

- The `app/api/messages` folder and the `route.js` file inside it.
- The `app/components/Messages.jsx` file.
- The `app/api/messages/route.js` file.

That should do it for fetching data from our server components. Now we can start to look into actions and adding, updating, deleting data.
