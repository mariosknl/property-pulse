# Ordering New Messages First

Now we want to order the messages in the chat so that the most recent messages are at the top but also the unread messages are at the top. This is a bit more complex than just ordering by the timestamp. We need to order by the timestamp but also by the read status.

Open the `app/api/messages/route.js` file and change the GET function to the following:

```javascript
export const GET = async (request) => {
  try {
    await connectDB();

    const { userId } = await getSessionUser();

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 }) // Sort "read" messages by date in descending order
      .populate('sender', 'username')
      .populate('property', 'name');

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 }) // Sort unread messages by date in descending order
      .populate('sender', 'username')
      .populate('property', 'name');

    const messages = [...unreadMessages, ...readMessages]; // Combine unread and read messages

    return new Response(JSON.stringify(messages), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
```

We are now querying the database for two sets of messages. The first set is the read messages and the second set is the unread messages. We are then combining the two sets of messages and returning them to the client.

When the page loads, the new/unread messages will be at the top of the chat and the read messages will be below them.
