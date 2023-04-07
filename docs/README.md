# node-debt-snowball

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/nielse63/node-debt-snowball/node.js.yml?style=for-the-badge) ![Depfu](https://img.shields.io/depfu/dependencies/github/nielse63/node-debt-snowball?style=for-the-badge) ![Codecov](https://img.shields.io/codecov/c/github/nielse63/node-debt-snowball?style=for-the-badge) ![GitHub issues by-label](https://img.shields.io/github/issues-raw/nielse63/node-debt-snowball/bug?label=open%20issues&style=for-the-badge) ![GitHub](https://img.shields.io/github/license/nielse63/node-debt-snowball?style=for-the-badge)

> Node script to calculate debt repayment using the snowball method

Given an array of accounts and additional payment amount, `node-debt-snowball` will calculate the date of your final payment and an array of all the payment's you'll make.

## Installation

```bash
npm install --save node-debt-snowball
```

## API

You can calculate debt payoff by passing an array of account objects to `snowball` and (optionally) a second parameter as a number for an additional amount above the sum of the minimum monthly payment for each account:

```js
import snowball from 'node-debt-snowball';

const repaymentPlan = snowball(accounts[], additionalPayment);
```

In the example below, we are providing `snowball` with two accounts - a credit card and student loan - and are able to contribute an additional $50 per month to reducing our debt:

```js
snowball(
  [
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
  ],
  50
);
```

Each account must be an object following the schema:

```json
{
  "name": "string",
  "interest": "number",
  "balance": "number",
  "minPayment": "number"
}
```

### Response Schema

```jsonc
[
  {
    "balance": "number",
    "accounts": [
      {
        "name": "string",
        "startingBalance": "number",
        "endingBalance": "number",
        "paymentAmount": "number",
        "accruedInterest": "number",
        "additionalPayment": "number"
      }
      // more accounts...
    ]
  }
  // more payment periods...
]
```

`snowball` returns an array of objects, each representing a payment period over the life of an existing balance.

## Contributing

Clone the repo and install the dependencies:

```bash
git clone https://github.com/nielse63/node-debt-snowball.git
cd node-debt-snowball
npm ci
```

### NPM Scripts

<!-- prettier-ignore-start -->
| Script          | Description                                                         |
| --------------- | ------------------------------------------------------------------- |
| `npm run lint`  | Lint and autofix source files                                       |
| `npm run build` | Compile the TypeScript source to the `dist` directory               |
| `npm test`      | Runs unit tests with Jest                                           |
| `npm run dev`   | Executes the example script, saving the response to the file system |
<!-- prettier-ignore-end -->
