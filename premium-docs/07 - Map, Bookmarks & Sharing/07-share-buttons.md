# Share Button

We have the bookmarking system working nicely. Let's now add the ability to share a property listing on social media.

We are going to use a package called [react-share](https://www.npmjs.com/package/react-share) to do this. It provides a set of components for sharing links on social networks. Right now we have a single share button, but we are going to replace that with a set of buttons for sharing on Facebook, Twitter, WhatsApp and Email. You can use other services if you want. Just look at the [documentation](https://www.npmjs.com/package/react-share) for the full list of supported services.

Let's install it:

```bash
npm install react-share
```

Open the `components/BookmarkButton.jsx` file and replace the contents with the following:

```jsx
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

const ShareButton = ({ property }) => {
  const shareUrl = `http://${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 className='text-xl font-bold text-center pt-2'>
        Share This Property:
      </h3>
      <div className='flex gap-3 justify-center pb-5'>
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type}ForRent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator=':: '
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property: ${shareUrl}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};
export default ShareButton;
```

We are bringing in the components we need from the `react-share` package. We are then creating a `ShareButton` component that takes a `property` object as a prop. We are then creating a `shareUrl` variable that contains the URL of the property page. Make sure that you have the domain/url in your `.env` file and make sure that when you deploy, you change the value on the server to your live domain.

We are then rendering a set of `ShareButton` components, each with a different social network. We are passing in the `shareUrl` and some other properties to each button.

The Facebook one will not work with a local domain, but it will once the project is deployed. You can test it by adding a live domain in the share URL.
