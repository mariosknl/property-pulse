# Delete Messages

We want the user to be able to delete messages. 

## API Route

In the `app/api/messages/[id]/route.js` file, add the following code:

```javascript
// DELETE /api/messages/:id
export const DELETE = async (request, { params }) => {
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

    // Delete message
    await message.deleteOne();

    return new Response('Message Deleted', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
```

it is very similar to the mark as read route. We connect to the database, get the user, find the message, check if it exists, verify ownership, and then delete the message. If anything goes wrong, we return a 500 status code.

## Event Handler


Open the `components/Message.jsx` file and add the following event listener to the `Delete` button:

```javascript
<button
  onClick={handleDeleteClick}
  className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
>
  Delete
</button>
```

Now add the `handleDeleteClick` function to the `Message` component:

```javascript
const handleDeleteClick = async () => {
  toast.success('Message deleted');
};
```


What we're going to do here is set a new piece of state called `isDeleted`. So add this to your Message component:

```javascript
const [isDeleted, setIsDeleted] = useState(false);
```

Now call this in the handler:

```javascript
const handleDeleteClick = async () => {
  try {
    const res = await fetch(`/api/messages/${message._id}`, {
      method: 'DELETE',
    });

    if (res.status === 200) {
      // Delete was successful
      setIsDeleted(true);
      toast.success('Message deleted');
    }
  } catch (error) {
    console.error('Error deleting message:', error);
  }
};
```

Now all we need to do is add a conditional to the return statement to check if the message has been deleted:

```javascript
if (isDeleted) {
  return null; // Return null to render nothing if the message is deleted
}
```


That's it! Now you should be able to delete messages from the UI and the server. If you reload the page, the message should be gone.
