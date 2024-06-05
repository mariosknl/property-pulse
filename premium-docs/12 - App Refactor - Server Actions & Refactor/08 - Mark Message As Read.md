# Mark A Message as Read

Right now, when we click the button to mark a message as read, we hit an API route. We are going to change that to an action.

Create a file at `app/actions/markMessageAsRead.js` and add the following code:

```js
'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function markMessageAsRead(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.user) {
    throw new Error('User ID is required');
  }
  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) throw new Error('Message not found');

  // Verify ownership
  if (message.recipient.toString() !== userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Update message to read/unread depending on the current status
  message.read = !message.read;

  // revalidate cache
  revalidatePath('/messages', 'page');

  await message.save();
  return message.read;
}

export default markMessageAsRead;
```

This action will mark a message as read or unread depending on the current status. It will also revalidate the cache for the `/messages` page.

Now Let's go to the `app/components/Message` component and update that.

Import the action at the top of the file:

```js
import markMessageAsRead from '@/app/actions/markMessageAsRead';
```

Add an onClick to the mark as read button:

```js
<button
  onClick={handleReadClick}
  className={`mt-4 mr-3 ${
    isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'
  } py-1 px-3 rounded-md`}
>
  {isRead ? 'Mark As New' : 'Mark As Read'}
</button>
```

Now let's add the handleReadClick function:

```js
const handleReadClick = async () => {
  const read = await markMessageAsRead(message._id);

  setIsRead(read);
  setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
  toast.success(`Marked as ${read ? 'read' : 'new'}`);
};
```

We are calling the `markMessageAsRead` action and updating the UI based on the response. We are also updating the unread count and showing a toast message.

Now try and click the button to mark a message as read. You should see the UI update and the message marked as read in the database.
