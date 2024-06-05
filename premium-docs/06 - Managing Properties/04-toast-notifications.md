# Toast Notifications

There will be cases where we want to show a message to the user. After deletion is one of those cases.

We will use a component called [react-toastify](https://www.npmjs.com/package/react-toastify) to show a message to the user.

Install the package:

```bash
npm install react-toastify
```

## Rendering Toasts

We need to have the `ToastContainer` component at the top of the app. Open the `app/layout.jsx` file and add the following code at the top of the file:

```jsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({ children }) => {
  return (
    <>
      <ToastContainer />
      {/* Rest of the layout */}
    </>
  );
};
```

## Showing Toasts

Now go back to the `ProfilePage` component and import the `toast` component:

```jsx
import { toast } from 'react-toastify';
```

Now we can use the `toast` component to show a message to the user. Let's add a toast to the `handleDeleteProperty` function. Replace the console log with the following code:

```jsx
toast.success('Property deleted successfully');
```

Now try deleting a property. You should see a message at the top of the page.

In the handler, you can also add an error toast if the deletion fails replace the console logs with the following:

```jsx
toast.delete('Failed to delete property');
```
