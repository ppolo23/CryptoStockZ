# Frontend

## Description

The Frontend makes all the functionalities of our application available to users, from their registration in the system to the creation and transfer of products (depending on their permissions).
 
This visual component consists of a web application developed using the Javascript React library, which makes a series of elements available to the developer for the development of web interfaces. The basic philosophy of React is to create encapsulated components that manage their own state to turn them into complex user interfaces.
Thus, the basic components for the actual operation of our system have been developed, whose translation in views can be seen in detail in section c. System operation.
 
Apart from the components, the necessary calls have been developed for the interaction with both the Backend (BackendService.js) and the Smart Contracts (ContractService.js), specifically with the CryptoStockZ.sol contract.
In this way, while the axios library has provided us with the necessary functions to launch queries to the Backend, the web3js library has provided us with operations related to the blockchain. Among them are the verification of having a web3 provider in the browser, the acquisition of the account in use in the installed wallet (in this case Metamask) and the execution of the functions available in the aforementioned Smart Contract.
 
To conclude, Metamask has provided us with the necessary account management to be able to send transactions to the blockchain, in this case, our local Ganache network. For which the accounts available in said network have been imported in order to simulate the real operation of several users.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!


