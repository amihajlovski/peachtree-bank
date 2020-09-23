# PeachTree Bank

In this application you can see the list of transactions you already made, and additionaly to transfer money to the merchants. The transactions can be sorted by date, beneficiary and amount. Also, you can search for transactions using the search input.

The application is developed using Angular Framework and it uses the latest version (10.1.1).

## Prerequisites

In order to run the application, first, you need to have installed Node.js and NPM

## Getting started

To run the application, you need to install all of the dependencies using the following command:

```bash
npm install
```

When the dependencies are installed, run the application using:

```bash
npm start
```

### Testing

Testing is done using the default Angular testing library (karma/jasmine). Tests can be run using:

```bash
npm run test
```

## Architecture

The application at the moment is not modularized since it doesn't have too many pages or functionalities. With adding more features, it can be split into modules with what we will gain more optimized and scalable application. In that case the routes would be lazy-loaded (on demand), not all at once.

## Folder Structure

The whole application is located in `src/app`. In the `app` you can see a list of folders:

- **\_mocks\_** - in this folder I keep the mocked data (response) that is used all over the application
- **components** - this folder has all of the UI components (presentational layer)
- **containers** - this is the place where we fetch the data and parse it if needed (bussines logic)
- **models** - directory where all of the interfaces are defined
- **services** - has two services, one for fetching the data and other one for filtering the results
- **styles** - the common variables that are used all over the application like colors and fonts
- **utils** - currently only constants file

## Styling

For the styling I'm using SCSS in combination with Angular Material. The material library is used mostly for showing the cards, buttons and icons in the application.

## Link

The application is deployed using Firebase just for demo purposes
https://peachtree-a7471.web.app/
