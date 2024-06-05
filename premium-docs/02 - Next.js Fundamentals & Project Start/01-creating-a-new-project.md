# Creating a New Next.js Project

Now we are going to create a new Next.js project. We are going to use the `create-next-app` command to do this. This command is provided by the Next.js team and it is the easiest way to create a new Next.js app.

Let's create a folder for our new project. You can do this from within your operating system's file manager or the terminal.

If you use a terminal, navigate to where you want to create the folder and run the following commands to create the folder and navigate into it:

```bash
mkdir property-pulse-nextjs
cd property-pulse-nextjs
```

To create a new Next.js app, open your terminal and run the following command:

```bash
npx create-next-app ./
```

You will be asked some questions. You can answer them as you see fit. I will answer with the defaults, which are as follows:

```bash
√ Would you like to use TypeScript? ... No
√ Would you like to use ESLint? ... No
√ Would you like to use Tailwind CSS? ... Yes
√ Would you like to use `src/` directory? ... No
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to customize the default import alias (@/*)? ... No
```

## Running the Project

Now that we have created our project, we can run it. To do this, run the following command:

```bash
npm run dev
```

By default, Next.js runs on port 3000. So, if you open your browser and navigate to `http://localhost:3000`, you should see the landing page for your new Next.js app.

## Directory Structure

Let's go over some of the files and folders that were created for us when we ran the `create-next-app` command.

### `package.json`

This file contains information about our project, such as the name, version, and dependencies. It also contains scripts that we can run to perform certain tasks. For example, we can run `npm run dev` to start our project in development mode, which we just did.

As far as dependencies, we just have the `next` package, which is the Next.js framework itself. We also have the `react` and `react-dom` packages, which are required by Next.js. For dev dependencies, we have 'tailwindcss', which is the Tailwind CSS framework. We also have `autoprefixer` and `postcss`, which are required by Tailwind CSS.

### `tailwind.config.js`

This file is used to configure Tailwind CSS. The `content` property is used to specify the files that Tailwind CSS should scan for classes. By default, it scans the `pages`, `components` and `app` folders.

The `theme` property is used to customize the default Tailwind CSS theme. For example, we can change the default colors, fonts, and font sizes. I actually do want to add a couple things here. I want to add the default font family of `poppins` and also add an option for a 70/30 layout for our grid.

We can replace the `backgroundImage` property. So your file should look like this:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
    },
  },
  plugins: [],
};
```

The background image will be removed from the landing page, but that's ok. We are going to wipe the whole thing out anyway.

### `next.config.js`

This is the main config file for our Next.js app. We can use this file to customize the behavior of Next.js. This file is a regular Node.js module, not a JSON file. It gets used by the Next.js server and build phases, and it's not included in the browser build. We don't need to mess with this right now.

This file is used to configure the VS Code editor. It is used to provide intellisense for Tailwind CSS classes. We don't need to mess with this right now.

### `public` Folder

This folder is used to store static assets, such as images, fonts, and favicons. Next.js automatically adds caching headers to the assets in this folder.

#### Images

We can add images to this folder and then reference them in our code. This is where site images like the logo will go. Ultimately, we'll be using **Cloudinary** for our property listing images, however we'll use this folder for them when we start out.

### `app` Folder

The `app` folder is where all of our pages go. A page is a React component that is associated with a route based on its file name. I'm going to talk about that in the next video. Prior to Next version 13, the pages folder was called `pages`. Now it's called `app` and behaves a bit differently. The `pages.js` file is the homepage. That is actually what we are seeing when we run our project. We also have a layout component. This is a component that wraps all of our pages. So you would put things like a header and whatever you want on all of the pages that use that layout. There's also a `globals.css` file for any site-wide CSS. In the next video I'm going to delete the entire app folder so that we can start from scratch and you know exactly what's going on.

So those are the main folders and files we get to start out with. We'll also be adding more folders such as components, models and utils.

In the next lesson, we will clean up the structure a bit, recreate the `app` folder and also bring over some images from the theme files.
