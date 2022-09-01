# Shopka

Shopka is an online portfolio store.\
Written in [react](https://ru.reactjs.org) in conjunction with [redux](https://redux.js.org).\
This project is made to demonstrate my mastery of these technologies.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## More about app

### Technologies

-  [react](https://ru.reactjs.org)
-  [redux](https://redux.js.org)
-  [MUI](https://mui.com) \- for writing styles
-  [firebase](https://firebase.google.com/)
-  [redux-toolkit](https://redux-toolkit.js.org)
-  [formik](https://formik.org) and [yup](https://www.npmjs.com/package/yup) \- to create forms
-  [react-router-dom](https://reactrouter.com/en/main) \- to implement routing in the application
-  [redux-thunk](https://www.npmjs.com/package/redux-thunk)\
   And other libraries...

### Features

#### `/` home page

-  View and filter products by price, brand, and rating. Sorting by decreasing/decreasing price and rating is also available.
-  Add products to liked
-  Change products size

![](https://raw.githubusercontent.com/igor0400/react-redux_shop/main/readme/home-page.gif)

#### `/cart` page

-  Change the amount of products
-  Remove items individually or clear the cart completely
-  Proceed to checkout

#### `/liked` page

-  Delete products from liked
-  Move items to cart

#### `/profile` page

-  Pages navigation
-  Sign out

#### `/orders` and `/orders/:id` page

-  View order information

#### `/payorder` page

-  Place your order

### Plans

-  Adapt to mobile devices
-  Make animations when deleting products
