# node-debt-snowball

> Node script to calculate debt repayment using the snowball method

Given an array of accounts and additional payment amount, `node-debt-snowball` will calculate the date of your final payment and an array of all the payment's you'll make.

## Installation

```bash
npm install node-debt-snowball
```

## Usage

Example usage and output can be found in the [`examples/`](./examples) directory.

```js
const snowball = require('node-debt-snowball');
// or import snowball from 'node-debt-snowball';

const accounts = [
  {
    name: 'Credit Card',
    interest: 14.99,
    balance: 5000,
    minPayment: 120,
  },
  {
    name: 'Student Loan',
    interest: 6.55,
    balance: 1000,
    minPayment: 40,
  },
];
const additionalPayment = 100;

const repaymentPlan = snowball(accounts, additionalPayment);
// repaymentPlan is an array of objects representing each payment made
// an example response can be found in examples/repaymentPlan.json
```

## Development

Clone the repo and install the dependencies:

```bash
git clone https://github.com/nielse63/node-debt-snowball.git
cd node-debt-snowball
npm ci
```

### NPM Scripts

| Script            | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `npm run lint`    | Lint and autofix source files                            |
| `npm test`        | Runs unit tests with Jest                                |
| `npm run release` | Runs `release-it` to bump the version and release to npm |
