# Message Submit and API Route

Now we need to create the API route to send the message. Create a new file at `app/api/messages/route.js` and add the following code:

```javascript
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    const { email, phone, message, property, recipient } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response('User ID is required', { status: 401 });
    }

    const { user } = sessionUser;

    // Can not send message to self
    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: 'Can not send message to yourself' }),
        { status: 400 }
      );
    }

    // Create a new message
    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      email,
      phone,
      body: message,
    });

    // Save message
    await newMessage.save();

    return new Response(JSON.stringify({ message: 'Message Sent' }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};
```

We are getting the message data from the request body and the user from the session. We are also checking to see if we own the listing and if we are trying to send a message to ourselves. If everything checks out, we create a new message and save it to the database.

## Update The Form

Now we need to update the `components/PropertyContactForm.jsx` file to send the message. Add the following code to the `handleSubmit` function:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = {
      name,
      email,
      message,
      phone,
      recipient: property.owner,
      property: property._id,
    };

    const res = await fetch(`/api/messages`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      toast.success('Message sent successfully');
      setWasSubmitted(true);
    } else if (res.status === 400) {
      const data = await res.json();
      toast.error(data.message);
    } else if (res.status === 401) {
      toast.error('You must be logged in to send a message');
    } else {
      toast.error('Error sending form');
    }
  } catch (error) {
    console.error('Error sending form');
    toast.error('Error sending form');
  } finally {
    setName('');
    setEmail('');
    setMessage('');
    setPhone('');
  }
};
```

We are sending a request to our endpoint with the message data. If the message is sent successfully, we show a success message. If there is an error, we show an error message.

In the next lesson, we will check if the user already has sent a message.
