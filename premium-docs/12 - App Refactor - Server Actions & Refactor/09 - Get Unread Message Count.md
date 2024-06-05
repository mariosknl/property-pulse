# Get Unread Message Count

Now that we can mark messages as read, let's refactor getting the unread message count. We have a context for messages because we need to display the unread message count in the header. We are going to change it to use an action to get the unread message count.

Let's create a final action at `app/actions/getUnreadMessageCount.js`:

```javascript
'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

async function getUndreadMessageCount() {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return { count };
}

export default getUndreadMessageCount;
```

We are just counting the number of unread messages for the current user.

Now let's open the context at `app/context/GlobalContext.js` and add the following code:

```javascript
'use client';
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const GlobalContext = createContext();

// Create a provider
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: session } = useSession();

  // NOTE: since our GlobalContext is responsible for unreadCount state then it
  // makes sense to also fetch the unreadCount here too and remove that from the
  // UnreadMessageCount component.
  // Additionally here we are using a server action to get the unreadCount

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Create a custom hook to access context
export function useGlobalContext() {
  return useContext(GlobalContext);
}
```

Now we are fetching the unread count from the action, so we don't need to fetch from the API from the component. So Let's open the `app/components/UnreadMessageCount.jsx` and remove the fetch. It should look like this:

```javascript
'use client';
import { useGlobalContext } from '@/context/GlobalContext';

// NOTE: here the logic for getting the unread message count has been moved to
// GlobalContext since that component is also responsible for managing that
// state, additionally we can use a server action to get the unread message
// count.

const UnreadMessageCount = () => {
  const { unreadCount } = useGlobalContext();

  return unreadCount > 0 ? (
    <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
      {unreadCount}
    </span>
  ) : null;
};
export default UnreadMessageCount;
```

Now you may see a message like "useSession must be wrapped in <SessionProvider>". This is because since we are now using sessions in the global provider, we have to switch the order in the layout.

Open the `app/layout.jsx` and switch the order of the `AuthProvider` and `GlobalProvider`:

```javascript
<AuthProvider>
  <GlobalProvider>
    <html lang='en'>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  </GlobalProvider>
</AuthProvider>
```

Now you can delete all folders in the `app/api` directory except for the `auth` folder.

Everything should work as expected.

The course will be updated to use this code soon.
