## Demo

https://food-truck-locator-404.herokuapp.com/

## Brief Intro

A food truck locator app, that shows a google map showing locations of food trucks available. The locations are available from a mock api. And the user can search what they want to eat and where they want to eat. It's a client-side search, so the map updates instantly.

## Technical Specs

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Libraries used are react-router-dom, redux, redux-saga, react-redux, google-maps-react.

Environment variables needed are: REACT_APP_API_BASE_URL (https://data.sfgov.org/resource) and REACT_APP_GOOGLE_MAP_API_KEY (your google map's api key)

So basically, the app follows the flux pattern. A centrally configured store takes in reducers and sagas, the component initiates the action call, the action initiates the saga call, updates the reducer and then ultimately componet gets updated.

## Trade offs

This UX of the search could be much better. On code level, theming could be better handled.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Starts the development server

### `npm run start`

Builds the app for production to the `build` folder.<br />
