# Add Message Context

So at the moment, everything is working but I would like the number of unread messages in the navbar to immediately update when we mark a message as read or as new. To do this, we will use a context to store the number of unread messages and update it when we mark a message as read or as new.

Create a new file at `/contexts/GlobalContext.js`.

We could call this file `MessageContext.js` but I think it's better to have a single context for the whole app. This way, if we need to add more global state, we can do it in the same file. If you find yourself adding a lot of state to this file, you can then separate them and you might want to consider using a state management library like Redux.

Add the following code to the file:

```javascript
'use client';
import { createContext, useContext, useState } from 'react';

// Create context
const GlobalContext = createContext();

// Create a provider
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

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

We need to add `use client` since we are using React hooks. We then create a context and a provider component. The provider component will wrap the whole app and will provide the state to all the components. We also create a custom hook to access the context.

Now we need to wrap the whole app with the provider. Open the `app/layout.jsx` file andimport the context:

```javascript
import { GlobalProvider } from '@/contexts/GlobalContext';
```

Now wrap the whole app with the provider:

```javascript
const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang='en'>
          <body>
            <ToastContainer />
            <Navbar />
            <main>{children}</main>
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};
```

Now we need to get the state from the context and use it in the `UnreadCount` component. Open the `components/UnreadMessageCount.jsx` file and import the custom hook:

```javascript
import { useGlobalContext } from '@/contexts/GlobalContext';
```

Remove the local state for unread messages. So remove this line:

```javascript
const [unreadCount, setUnreadCount] = useState(0); // Remove
```

Add this line instead:

```javascript
const { unreadCount, setUnreadCount } = useGlobalContext(); // Access unreadCount from the global context
```

Your `useEffect` should still fetch the unread count. It should look like this:

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

Now in your `components/Message.jsx` file, we want to call the `setUnreadCount` function when we mark a message as read or as new. We need to import the function from the context:

```javascript
import { useGlobalContext } from '@/contexts/GlobalContext';
```

Add the following line to the `Message` component:

```javascript
const { setUnreadCount } = useGlobalContext();
```

In the `handleReadClick` function, add the following line after the `setIsRead(read);` line:

```javascript
setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
```

Now when you mark a message as read or as new, the number in the navbar will immediately update.

## Set On Delete

We also need to update the number of unread messages when we delete a message. Open the `Message` component and add the following line to the `handleDeleteClick` function under `setIsDeleted(true);`. This will update the number of unread messages when we delete a message.

```javascript
setUnreadCount((prevCount) => prevCount - 1);
```

Our messaging system is now complete with notifications. There are more features that you could add yourself, such as the ability to reply to a message or to email the user when they get a message.
