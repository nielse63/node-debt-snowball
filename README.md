<img align="left" style="margin-right:1rem;margin-bottom:1rem;" src="https://raw.githubusercontent.com/nielse63/node-debt-snowball/main/docs/assets/icon.svg" width="96" height="96">

# node-debt-snowball

<hr />

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/nielse63/node-debt-snowball/node.js.yml) ![Depfu](https://img.shields.io/depfu/dependencies/github/nielse63/node-debt-snowball) ![Codecov](https://img.shields.io/codecov/c/github/nielse63/node-debt-snowball) ![GitHub issues by-label](https://img.shields.io/github/issues-raw/nielse63/node-debt-snowball/bug?label=open%20issues) ![GitHub](https://img.shields.io/github/license/nielse63/node-debt-snowball)

> Node script to calculate debt repayment using the snowball method

## Features

- Fully tested with 100% code coverage
- Module and CommonJS compatible
- Nightly builds to evaluate accuracy
- Lightweight - completely dependency free

## Installation

```bash
npm install node-debt-snowball
```

## Usage

### Basic Usage

```js
import { snowball } from 'node-debt-snowball';

const accounts = [
  {
    name: 'Credit Card',
    interest: 14.99,
    balance: 1000,
    minPayment: 75,
  },
  {
    name: 'Student Loan',
    interest: 4.75,
    balance: 7500,
    minPayment: 150,
  },
];
const additionalPayment = 100;
const strategy = 'avalanche'; // possible values: avalanche (default), snowball

const repaymentPlan = snowball(accounts, additionalPayment, strategy);
console.log('repaymentPlan', repaymentPlan);
```

### Strategies

There are two options for the `strategy` argument:

1. `avalanche` - This strategy applies additional payments to the account with the highest interest rate. This is the default value
2. `snowball` - This strategy focuses on paying off the account with the lowest balance first

For additional information on these strategies [read more on Investopedia](https://www.investopedia.com/articles/personal-finance/080716/debt-avalanche-vs-debt-snowball-which-best-you.asp).

### API

Full API documentation is available can be found at [https://nielse63.github.io/node-debt-snowball](https://nielse63.github.io/node-debt-snowball/)

### Response Schema

```json
{
  "totalInterestPaid": "number",
  "totalPayments": "number",
  "strategy": "string",
  "payments": [
    {
      "balance": "number",
      "accounts": [
        {
          "name": "string",
          "balanceStart": "number",
          "balanceEnd": "number",
          "accruedInterest": "number",
          "additionalPayment": "number",
          "paymentAmount": "number"
        }
      ]
    }
  ]
}
```

A full sample response can be found at [`examples/response.json`](https://github.com/nielse63/node-debt-snowball/blob/main/examples/response.json).

## Contributing

Clone the repo and install the dependencies:

```bash
git clone https://github.com/nielse63/node-debt-snowball.git
cd node-debt-snowball
npm ci
```

### Prerequisites

Node `v20.13.1`:

```bash
nvm use v20.13.1
```

### NPM Scripts

<!-- prettier-ignore-start -->
| Script          | Description                                                         |
| --------------- | ------------------------------------------------------------------- |
| `npm run lint`  | Lint and autofix source files                                       |
| `npm run build` | Compile the TypeScript source to the `dist` directory               |
| `npm test`      | Runs unit tests with Jest                                           |
| `npm run dev`   | Executes the example script, saving the response to the file system |
| `npm run docs`  | Builds the documentation                                            |
<!-- prettier-ignore-end -->
