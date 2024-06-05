# Save User To Database

Alright so we have the sign in button working as far as we can tell. But we're not actually saving the user to the database. Let's do that now.

We want to go into the options file at `utils/authOptions.js`. You should already have the callback functions of `session` and `signIn`. They just don't do anything yet.

Let's start with the `signIn` function. First, let's import the function to connect to the database as well as the `User` model:

```js
import User from '@/models/User';
import connectDB from '@/config/database';
```

In the `signIn` function, we want to connect to the database. We can do that with the `connectDB` function. Then we want to check if the user exists in the database. If they don't, we want to create them.

Add the following code. You can keep or leave the comments:

```js
 async signIn({ profile }) {
      // 1. Connect to database
      await connectDB();
      // 2. Check if user exists in database
      const userExists = await User.findOne({ email: profile.email });

      // 3. If not, create user in database
      if (!userExists) {
        // Truncate user name if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. return true to allow sign in
      return true;
    },
```

We also truncated the username if it is too long.

Now, for the session, we want to get the user from the database and add the user id to the session. Add the following code:

```js
  async session({ session }) {
      // 1. Get user from database
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign user id from database to session
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    }
```

## Test It Out

Now, let's test it out. Go to the sign in page and sign in with your Google account. Then, go to the MongoDB Atlas dashboard or the Compass client and check the `users` collection. You should see your user there.

You should also see the fake user profile image in the navbar. We are now logged in! In the next video, let's change the image to the user's image.
