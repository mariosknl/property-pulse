# Number Notification

Right now, in the navbar, we have a notification icon that shows the number of unread messages. It is just hardcoded at the moment. We need to make it dynamic so that it shows the actual number of unread messages.

## API Route

Create a file at `app/api/messages/unread-count/route.js` and add the following code:

```javascript
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify(count), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
```

We want to first check if there even is a user logged in. If there is, we fetch the number of unread messages from the database and return it. If there is no user, we return a 401 status code.

Let's create a component for the unread message count. Create a file at `components/UnreadMessageCount.jsx` and cut thhe following from the `components/Navbar.jsx` component:

```jsx
<span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
  2{/* <!-- Replace with the actual number of notifications --> */}
</span>
```

Paste it in the new component and add a piece of state called `unreadCount` and replace that hardcoded `2`:

```jsx
'use client';
import { useState, useEffect } from 'react';

const UnreadMessageCount = ({ session }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  return  unreadMessagesCount > 0 && (
    <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
      {unreadCount}
    </span>
  );
};
export default UnreadMessageCount;

```

The red number will only be displayed if there are unread messages. Now we need to fetch the number of unread messages from the server.

Add a function in the `useEffect` hook to fetch the number of unread messages. be sure to call it as well:

```javascript
 useEffect(() => {
    if (!session) return;

    const fetchUnreadMessages = async () => {
      try {
        const res = await fetch('/api/messages/unread-count');

        if (res.status === 200) {
          const data = await res.json();
          setUnreadCount(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUnreadMessages();
  }, [session]);
```

We are checking to see if there is a user logged in by checking the session. Also, be sure to add session to the dependency array because we need to check when re-rendered. If there is a session/user, we fetch the number of unread messages and set the state. If there is no user, we do nothing.

