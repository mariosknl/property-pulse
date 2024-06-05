# What Is Next.js?

Before we get started coding, let's take a few minutes and talk about what Next.js is and why you might want to use it.

The simple definition for Next is an open-source web development framework for building React-based applications with server-side rendering and static website generation

I think some people get confused because we're essentially using a framework within a framework. So I like to describe Next as more of a full stack enviroment to create your React applications within. You've probably built React projects with **create-react-app**, which is fine, however that would be a single page application, which has some drawbacks. Next.js provides a way for your React projects to be server-rendered, rather than having everything bundled and run on the client. In addition, you can also use Next to generate static website, which are extremely fast.

So overall, just of Next as a better way to work with React. A lot of developers never go back to CRA after learning Next.js. I think SPAs (Single Page Applications) are fine for smaller applications but Next.js is much more beneficial to full websites and larger applications. 

## Types of Websites & Applications

So let's look at some of the common types of websites that we can build.

### Static Websites

Think back to when you first started learning HTML and CSS. You would create an HTML file and a CSS file and then open the HTML file in your browser. This is the simplest form of a website. You may have created a homepage and then any other pages or urls were actually separate HTML files. This is a static website.

The advantage to static websites is that they are very fast when it comes to load times, however they are not very dynamic and the interface is not very interactive. Which may be fine for some websites, but not for others.

### Single Page Applications

As you learned more about web development, you probably learned about JavaScript and how you could use it to make your websites more interactive. You might have learned about AJAX and the fetch api and how to fetch data from a server and update the page without having to refresh the entire page. React and other frontend frameworks took this and ran with it. You could build entire applications that only had one HTML file and all of the content was loaded and updated with JavaScript. So when you go to a url like /about, the entire page is not reloaded in the browser, it's just the content that changes. 

The advantage to this is that the user experience is much faster and interactive. The disadvantage is that the initial load time can be slower and it can be harder to make your application SEO friendly because everything is loaded with JavaScript.

### Server Rendered Applications

Server-side rendered applications are a mix of static websites and single page applications. When you go to a url, the server will generate the HTML and CSS and send it to the browser just like a static website. But then the JavaScript will take over and make the page more interactive and dynamic. This is the best of both worlds. The initial load time is fast and the user experience is fast and seamless. That's what Next.js is all about. You can even create API routes and serverless functions that run on the server and are not exposed to the client. This is a powerful feature that you can't do with React alone.

### Static Site Generators

Next.js can also be used to generate static websites. It will generate all of the HTML and CSS at build time and then send it to the browser. This means that the server does not have to do any work when a user requests a page. This is the fastest type of website. You can have interactive content, however if the content changes, you have to rebuild the entire site and redeploy it. This is great for personal blogs and documentation sites. 

Next.js is both an SSR framework and a static site generator. You can choose which type of application you want to build and you can even mix and match. In our project, we'll have some pages that are server rendered and some that are statically generated. 


## Next.js Features

Let's take a look at some of the features that Next.js offers in addition to the obvious SSR and SSG functionality and all of the features of React in general.

- File-Based Routing: With a SPA, we have to install a router and define all of our routes. With Next, we simply create a React component in the `app` folder or `pages` folder for older versions of Next and we go to that route in the browser and it just works. Similar to what we do with html and php files.
- API Routes: We can also create API routes that run on the server where we can interact with databases and so on. Our project will have lots of API routes where we'll use MongoDB and the Mongoose client to work with our data. We can handle GET, POST, PUT and DELETE requests and not have to use Express or any other backend framework.
- React Server Components: Render components on the server. This is great for SEO and fast load times. It also allows you to use data that you would not want to share in the client such as API keys.
- Data Fetching: You can also use fetch from React Server Components and not have to use a useEffect hook. The page loads in the browser with the data already there.
- Environment Variables: Next.js supports environment variables, allowing developers to configure different settings for development, staging, and production environments. We'll have a `.env` file for things like API keys and our MongoDB connection string.
- Customizable Head Tag & Meta Data: Since our pages are server rendered, we can easily add meta tags to the head just by exporting a metadata object. This is great for SEO.
- Image Optimization: Next offers an Image component to use instead of the `<img>` tag to optmize images and utilize things like lazy loading.
- Automatic Code Splitting: Next.js automatically splits JavaScript bundles based on the page boundaries, resulting in smaller initial bundle sizes and faster page loads.
- TypeScript Support: Next.js has built-in support for TypeScript, providing static typing and improved developer tooling for type safety.
CSS Support: There is built-in support for CSS, allowing developers to use CSS modules, CSS-in-JS libraries like styled-components or emotion, or global CSS files. There is also Tailwind integration right out of the box, which is what we'll be using for our project.
Fast Refresh: Next.js includes Fast Refresh, a feature that enables instant feedback on code changes during development without losing component state.

Those are some of the major features of Next.js. 

Now that you know what Next.js is, let's move on and start setting up our dev environment.