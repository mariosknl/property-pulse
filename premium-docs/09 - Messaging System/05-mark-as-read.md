# Mark As Read

Now that we can read our messages, we want to be able to mark them as read/unread. This will allow us to keep track of which messages we have read and which we have not.

## API Route

Let's create the route to mark a message as read. Create a file at `app/api/messages/[id]/route.js` and add the following code:

```javascript
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// PUT /api/messages/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;
    
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find message by id
    const message = await Message.findById(id);

    // Check if message exists
    if (!message) return new Response('Message Not Found', { status: 404 });

    // Verify ownership
    if (message.recipient.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Update message to red/unread depending on the current status
    message.read = !message.read;

    // Save message
    await message.save();

    return new Response(JSON.stringify(message), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
```

We are getting the message and the current user and making sure that the message belongs to the user before marking it as read. We then update the message and save it and send the updated message back to the client.

## The Button

Open the `components/Message.jsx` file and make it a client component since it will have state. Also import the following:

```javascript
'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
```

Add the following state to the `Message` function:

```javascript
const [isRead, setIsRead] = useState(message.read);
```

Let's show a `New` badge on the message if it is unread. Add the following code to the `Message` function:

Right after the first `div` tag add the following code:

```javascript
{
  !isRead && (
    <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
      New
    </div>
  );
}
```

## Button Condition

Let's change the button text and color based on if the message is read or not. Add the following code to the `Message` function:

```javascript
<button
  onClick={handleReadClick}
  className={`mt-4 mr-3 py-1 px-3 rounded-md ${
    isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'
  }`}
>
  {isRead ? 'Mark As New' : 'Mark As Read'}
</button>
```

## Event Handler

Let's add the event handler for the `Mark As Read` button. Add the following code to the `Message` function:

```javascript
<button
  onClick={handleReadClick}
  className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'
>
  Mark As Read
</button>
```

Now add the `handleReadClick` function above the `Message` function:

```javascript
const handleReadClick = async () => {
  try {
    const res = await fetch(`/api/messages/${message._id}`, {
      method: 'PUT',
    });

    if (res.status === 200) {
      const { read } = await res.json();
      console.log(read);
      setIsRead(true);
      toast.success('Message marked as read');
    }
  } catch (error) {
    console.error('Error marking message as read:', error);
  }
};
```



Now when you click the button, you should see either true or false based on if the message was read or not. Also, the message should be marked as read/unread in the database. You can delete the console.log statement.


In the next lesson, we will add the ability to delete messages.
