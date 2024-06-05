# Layout, Homepage & Metadata

Alright, so we have a Next.js project up and running. We're going to completely wipe out the landing page that was created for us and start from scratch.

Let's start by just deleting the entire contents of the `app` folder. This will of course break our app, but that's ok. We'll fix it in a minute.

## Layout Component

Let's start by re-creating the `layout.jsx` file in the `app` folder. This is where we'll put our main layout component. You can think of this as the entry point of our UI and a wrapper component that will wrap all of our pages. So we'll put things like a header and footer in here. We also want to include the `<html>` and `<body>` tags here.

Add the following to the `layout.jsx` file:

```jsx
const MainLayout = () => {
  return (
    <html lang='en'>
      <body>
        <main>MainLayout</main>
      </body>
    </html>
  );
};

export default MainLayout;
```

You may have to restart the server with `npm run dev` for the changes to take effect. Also, if you get any weird errors, try deleting the `.next` folder and restarting the server. This fixes a lot of issues. The `.next` folder is where Next.js stores its cache and build files. It is safe to delete. It will just be re-created when you restart the server.

So you should just see the text "MainLayout" on the page.

Notice that I used the `.jsx` extension instead of `.js`. This is because we're using JSX in this file. You can use either extension, but I like to use `.jsx` for files that contain JSX. If we were using TypeScript, we would use `.tsx`.

Now let's create the homepage. There is a convention to follow for file-based routing. I'll talk more about this in the next video, but for the homepage, you want to name the file either `page.jsx` or `page.js`. I'm going to use `page.jsx`

In this file, create a component/function called `HomePage` and return some JSX. For now, just return a div with the text "HomePage". Then export the component.

```jsx
const HomePage = () => {
  return <div>HomePage</div>;
};

export default HomePage;
```

With page components, you can call them whatever you want, however I like to use the convention of adding the word 'Page' to the end of the component name. So when we create the "Properties" page, we'll call it `PropertiesPage`. This will help us to distinguish between page components and regular components.

This will not show yet because we haven't imported it into the layout component. So let's do that now.

Add the following to the `layout.jsx` file:

```jsx
const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
```

All we did was add a `children` prop and then render it. This will render whatever page/component that we are visiting.

You should now see the text "HomePage" on the page.

I also want to mention that this component/page along with every other component that we create is actually running on the server by default. Next.js uses what are called 'React Server Components' or RSC. This is great for pages and components that do not need a lot of interactivity. It's also great for SEO because the HTML is generated on the server and sent to the browser. This is different from a regular React app where the HTML is generated in the browser. We can make our components render on the client very easily and I'll show you how to do that later on.

## Tailwind & Global Styles

Notice that we lost our Tailwind styles. This is because we deleted the `globals.css` file.

Let's create a folder in the root called `assets` and in that folder, create a folder called `styles` and then create a file called `globals.css`. This is where we'll put our global styles. We'll also import Tailwind here.

Add the following to the `globals.css` file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now we just need to import it into our layout component. So add the following to the `layout.jsx` file:

```jsx
import '@/assets/styles/globals.css';
```

Notice we used the `@` symbol. This is a special alias that Next.js uses to refer to the root of the project.

Now Tailwind should be working again.

## Metadata

Right now, we don't have a page title or any metadata. We can add any meta tags that we want by just exporting a `metadata` object from the layout.

In your `layout.jsx` file, add the following right under the globals.css import:

```jsx
export const metadata = {
  title: 'PropertyPulse',
  description: 'Find The Perfect Rental Property',
};
```

Now if you view the source of the page, you should see the title and description in the `<head>` section.

If you want to add a specific title or meta tag to a page, just export the `metadata` object from that page component. It will override the global metadata.

Alright, so we have our layout component and our homepage component. In the next video we will go over how file-based routing works in Next.js.

## Extra Attributes Error

You may see something like this - `app-index.js:34 Warning: Extra attributes from the server: cz-shortcut-listen,style`. This is usually from using a browser extension that modifies the DOM so it no longer matches the server-rendered content. Most of mine comes from the LastPass extension. You can just ignore this. It's just a warning and does not matter for production.

## Commit Your Code

At this point, you should make sure that you initialize a Git repository and commit your code. There is already a `.gitignore` file that has all of the files and folders that you do not want to commit.

#### Add `.env` to `.gitignore`

Open your `.gitignore` file and add `.env` to the bottom of the file. This will prevent your `.env` file from being committed to the repo. This is important because you don't want to expose your secrets to the public.

You can do this from the command line or from VS Code. I prefer to do it from the command line.

```bash
git init
git add .
git commit -m 'Layout and homepage components'
```

You can push to a remote repo like Github or Gitlab if you want, but I'm just going to keep it local for now.
