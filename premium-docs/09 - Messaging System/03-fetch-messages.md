# Fetch Messages

Now that we can send messages to users, let's add the functionality to fetch then and then display them.

Create a file at `app/messages/page.jsx` and add the following code:

```jsx
const MessagesPage = () => {
  return <div>MessagesPage</div>;
};
export default MessagesPage;
```

You should already have a `/messages` link in the navigation. If not, add it to the navbar.

## API Route

Let's make a route to fetch the messages. Open the file `/app/api/messages/route.js` and add the following code:

```jsx
// GET /api/messages
export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    const messages = await Message.find({ recipient: userId })
      .populate('sender', 'name')
      .populate('property', 'title');

    return new Response(JSON.stringify(messages), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
```

This will get the current user and then find all the messages where the recipient is the current user. It will then populate the `sender` and `property` fields with the `name` and `title` fields from the respective collections.

## Messages component

We are going to be using `useEffect` and `useState` in the `MessagesPage` component, so we need to make it a client component. However, I like to keep the actual pages as server components, so let's create a new file at `components/Messages.jsx` and add the following code:

```jsx
'use client';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch('/api/messages');

        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.log('Error fetching messages: ', error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  return <div>Messages</div>;
};
export default Messages;

```

We are just fetching the messages and putting them in the component state.

Now import it into the `MessagesPage` component and use it:

```jsx
import Messages from '@/components/Messages';

const MessagesPage = () => {
  return <Messages />;
};
export default MessagesPage;
```

You should see in the network tab of your devtools, the response with any messages that user has. Be sure it is an account that another user sent messages to or it will just be an empty array.

Next we will display the messages.
