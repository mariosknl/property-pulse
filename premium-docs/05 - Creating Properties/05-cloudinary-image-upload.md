# Cloudinary Image Upload

For uploading images, we are going to use the Cloudinary service. There are a few ways to do this. We could do everything from the client but we run into the issue of security of our keys. So I want to do it all from the API route on the server.

## Cloudinary Account

First, you need to have a Cloudinary account. You can create a free account at [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free).

## Cloudinary Env Variables

After creating your Cloudinary account, you need to get your Cloudinary settings. Click on the gear icon in the bottom left. The interface may be a bit different depending on when you are reading this, but you should be able to find the settings.

We need to find three things. The first is the cloud name. The second is the API key. And the third is the API secret.

Click on the "Account" tab on the left. You should see the cloud name. Copy it and paste it in the `.env` file as the value of the `CLOUDINARY_CLOUD_NAME` variable.

Then click on "Access Keys" and click "Generate new access key" and get the API key and secret. Your `.env` file should look like this:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Cloudinary Node.js SDK

We need to install the Cloudinary Node.js SDK. Run the following command:

```bash
npm install cloudinary
```

## Config file

We need to initialize the Cloudinary SDK. Instead of doing that within the API route, let's create a new file at `config/cloudinary.js`. We will put the initialization code in there.

```js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
```

Now open the route where we are submitting the form to at `app/api/properties/route.js` and bring in the Cloudinary config file.

```js
import cloudinary from @/config/cloudinary.js
```

Delete the `images` property from the `propertyData` object. This is because we are going to upload the images to Cloudinary and then add the Cloudinary URL to the property data.

```js
const propertyData = {
  // ...
  images, // Remove this line
};
```

Add the following code under the `propertyData` object:

```js
// Access the uploaded files from the form data
const imageUploadPromises = [];

for (const image of images) {
  // Assuming image is a File object, extract the file data
  const imageBuffer = await image.arrayBuffer();
  const imageArray = Array.from(new Uint8Array(imageBuffer));
  const imageData = Buffer.from(imageArray);

  // Convert the image data to base64
  const imageBase64 = imageData.toString('base64');

  // Upload the image data as a base64 string to Cloudinary
  const result = await cloudinary.uploader.upload(
    `data:image/png;base64,${imageBase64}`,
    {
      folder: 'propertypulsedev',
    }
  );

  imageUploadPromises.push(result.secure_url);
}

// Wait for all image uploads to complete
const uploadedImages = await Promise.all(imageUploadPromises);

// Add the uploaded images to the propertyData object
propertyData.images = uploadedImages;
```

Here we are looping through the images and converting them to base64 strings. Then we upload them to Cloudinary and push the URL to an array. Then we wait for all of the uploads to complete and add the array of URLs to the `propertyData` object.

If you add a property, your images should now be uploaded to Cloudinary and the URL should be in the database.

In the next video, we will make sure the images are being displayed where they are supposed to be.
