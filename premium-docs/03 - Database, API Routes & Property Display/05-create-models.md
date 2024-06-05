# Create Models

With MongoDB, we don't need to describe our data in the database layer like we do with SQL. Instead, we can just create a model in our application and Mongoose will create the collection for us.

We will need 2 models right now. One for the properties and one for the users. We need to do the users first because we will need to reference the user in the property model for the `owner` field.

## User Model

Create a folder in the root called `models` and create a file called `User.js` inside of it. This is where we will create our user model.

Add the following code to the file:

```js
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists!'],
      required: [true, 'Email is required!'],
    },
    username: {
      type: String,
      required: [true, 'Username is required!'],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);

export default User;
```

This is a pretty simple user model. We are using Google auth, so we don't need a password field. If you wanted to add local login later you could add one. All we need is the email, username, and image. We are also adding a `bookmarks` field that will be an array of property ids.

We are using the `timestamps` option to automatically add `createdAt` and `updatedAt` fields to our documents.

## Property Model

The property model will have many more fields and we need to reference the user model for the `owner` field.

Create a file at `models/Property.js` and add the following code:

```js
import { Schema, model, models } from 'mongoose';

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipcode: {
        type: String,
      },
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    rates: {
      nightly: {
        type: Number,
      },
      weekly: {
        type: Number,
      },
      monthly: {
        type: Number,
      },
    },
    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
      },
    },
    images: [
      {
        type: String,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Property = models.Property || model('Property', PropertySchema);

export default Property;
```

For the `owner` field, we are using the `ObjectId` type and referencing the `User` model. This will allow us to populate the user data when we query for properties.

One thing that I want to mention that may save you some headaches is that when you change your models, you need to restart your server and delete the `.next` folder in your project root. This will clear the cache and allow the server to pick up the new models.

Now that we have our models, in the next lesson, we will fetch the properties from the database.
