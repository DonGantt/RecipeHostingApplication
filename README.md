# Grandma's Cookbook 
This is a full stack application of a recipe hosting application built in order to share and send recipe to family and friends. 


## How It's Made:

**Tech used:** HTML, CSS, JavaScript, EJS, Node.JS, Express, Cloudinary, Mongoose, and Passport

This is a full-stack application I created in order to host recipes via HTML, EJS, CSS, JavaScript, Node, and various other modules. I started by creating a whiteboard of the model-view-controller layout I wanted and included separate routing paths to keep things organized. Once the layout was completed, I sketched out the general design of each view and established what data each view needs to send and receive.

After that was finished I then started getting together the necessary modules and packages to create the app. Using an Express-based stack on Node.JS, I put together Cloudinary for hosting images, Mongoose for creating model schemas in order to properly send and receive data, and Passport in order to authenticate and create user accounts. Nodemon, Multer, Morgan, and a few other packages I used to create the project.

Once I got the packages together, I created the server.js file and started putting the appropriate packages together. I then started creating the individual routes, controllers, and models; putting them in the appropriate folders and filling them with the relevant information. Once I filled in that data, I built how the appropriate views in EJS and created partials for the header and footer. I created the views and slowly put together the project and through multiple test, I got it up and running.

## Optimizations

Currently, I need to optimize it for multiple device outputs instead of just the generic tablet, mobile, and desktop viewport. I also need to optimize the design of the application. Currently, I intend to add in the future, a rating system, a way to view every user account and their created post, a favorite system where you can view your favorite posts, and a system that allows the user to like and unlike a post as well as only allow a user to like a post one time. Add a way to view your description while you edit it. Also fully integrate the Materialize CSS into the project and strip out the reset stylesheet, Tailwind and Bootstrap dependencies.

In the future, I want to build out the project using Svelte or React and create the backend using GoLang!

## Lessons Learned:

This project taught me the ins and outs of developing a full stack app, from conception to creation to implementation. It taught me very important lessons about researching potential tools and reading the documentation to implement those items. It also helped me become a better debugger and helped hone my skills when it comes to reading, fixing, and refactoring my code to be readable and improve modularity.


## Update Log

#11-12-22
-- Fixed Mobile Responsiveness: Properly sized each card for mobile layouts and re-spaced certain UI elements

-- Adds Parity Between Cards: Standardized the size of each card

-- Adds Liking And Unliking: You can now like and unlike a post; this also prevents spamming likes 

-- Uploaded to a temporary hosting provider at https://grandmascookbook.cyclic.app/

-- Updated Various UI Elements: Fixed certain UI elements like creating and updating post

## Incoming Updates

-- Adding the ability to view other user accounts

-- More UI improvements

-- Swapping hosting providers 


