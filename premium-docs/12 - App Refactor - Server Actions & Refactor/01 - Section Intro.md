# Section Intro

## What are Server Actions?

Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.

## Why Use Server Actions?

Server Actions are a more efficient way to handle form submissions and data mutations in Next.js applications. They allow you to keep your components clean and organized by moving the logic to the server.

In the current course, when we do something like submit a new property, we are doing it in a MERN-style way. We are using API routes to handle the form submission. This is fine, but it is not utilizing the full capabilities of Next.js. We can actually cut out most of the API routes by using Server Actions.

Let's go through one by one and replace the API routes with Server Actions.
