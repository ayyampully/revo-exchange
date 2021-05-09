## Revolut Exchange [![ayyampully](https://circleci.com/gh/ayyampully/revo-exchange.svg?style=svg)](https://circleci.com/gh/circleci/revo-exchange)

The app loads with two accounts initially (USD, EUR) both 100 balance. Currently using [https://openexchangerates.org/](https://openexchangerates.org/) to get currency info and exchange rates. The free version only supports base as USD, so when choosing others the rate is derived from USD.

Using only AED, CHF, EUR, GBP, INR, JPY, USD for simplicity. Because of the API monthly limit, i also added a mock function.

### Mocks

Mock can be enabled by adding `.env.local` file with `REACT_APP_ENABLE_MOCK=true` or manually change line 7 on `src\features\exchange\exchangeAPI.ts`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
