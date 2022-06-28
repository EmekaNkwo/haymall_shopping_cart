# Haymall Stripe Shopping Cart

## About Project

This is a MERN ( mongodb, express, react, node) Stack Shopping Cart that uses Stripe as the Payment gateway.

## Installation

To run the project locally you have to install Nodejs version 10+. Clone the project and run `npm install` from the root directory to install all the dependencies for the project. This project depends on some environment variables. Rename the `.env.example` files to `.env` and set the following variable to your values.

- STRIPE_SECRET_KEY = Insert Stripe Secret Key
- STRIPE_PUBLIC_KEY = Insert the Stripe Public Key

Once you set the environment variables try to run below commands:

- `npm run server` - will run the development server on localhost:5000
- `npm start` - will run the production server

This project uses `nodemon` for running the development server. If you have trouble working with nodemon due to permission uses, you can installing `nodemon` globally.

then you can `cd` to the `client` directory and run `npm install` to install all the dependencies for the project.

- `npm run server` - will run the development server on localhost:3000
