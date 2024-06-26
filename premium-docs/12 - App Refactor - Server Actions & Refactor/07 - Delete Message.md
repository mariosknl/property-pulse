# Delete Message

Now we want to be able to delete messages. Let's create the action for that. Create a new file in the `actions` folder called `deleteMessage.js`.

```javascript
'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function deleteMessage(messageId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) throw new Error('Message Not Found');

  // Verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  // revalidate cache
  revalidatePath('/messages', 'page');
  await message.deleteOne();
}

export default deleteMessage;
```

This action will delete a message if the user is the recipient of the message. We also revalidate the cache for the messages page after deleting a message.

Let's use the action. Open the `app/components/Message.js` file and add the following code:

```javascript
'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/context/GlobalContext';
import deleteMessage from '@/app/actions/deleteMessage';

// NOTE: This component now uses server actions to mark a message as read or
// delete a message rather than using a fetch request to an API route handler.

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setIsDeleted(true);
    setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
    toast.success('Message Deleted');
  };

  if (isDeleted) {
    return <p>Deleted message</p>;
  }

  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
      {!isRead ? (
        <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
          New
        </div>
      ) : null}
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Inquiry:</span>{' '}
        {message.property.name}
      </h2>
      <p className='text-gray-700'>{message.body}</p>

      <ul className='mt-4'>
        <li>
          <strong>Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email:</strong>{' '}
          <a href={`mailto:${message.email}`} className='text-blue-500'>
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{' '}
          <a href={`tel:${message.phone}`} className='text-blue-500'>
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{' '}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        className={`mt-4 mr-3 ${
          isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'
        } py-1 px-3 rounded-md`}
      >
        {isRead ? 'Mark As New' : 'Mark As Read'}
      </button>
      <button
        onClick={handleDeleteClick}
        className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
      >
        Delete
      </button>
    </div>
  );
};
export default MessageCard;
```

In this component, we added a delete button that calls the `deleteMessage` action when clicked. We also update the unread count in the global context after deleting a message.

In the next lesson, we will add the functionality to mark a message as read.
