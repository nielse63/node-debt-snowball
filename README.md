# node-debt-snowball

<img align="left" style="margin-right:1rem;margin-bottom:1rem;" src="data:image/png;base64,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">

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/nielse63/node-debt-snowball/node.js.yml?style=for-the-badge) ![Depfu](https://img.shields.io/depfu/dependencies/github/nielse63/node-debt-snowball?style=for-the-badge) ![Codecov](https://img.shields.io/codecov/c/github/nielse63/node-debt-snowball?style=for-the-badge) ![GitHub issues by-label](https://img.shields.io/github/issues-raw/nielse63/node-debt-snowball/bug?label=open%20issues&style=for-the-badge) ![GitHub](https://img.shields.io/github/license/nielse63/node-debt-snowball?style=for-the-badge)

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
import snowball from 'node-debt-snowball';

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

const repaymentPlan = snowball(accounts, additionalPayment);
console.log('repaymentPlan', repaymentPlan);
```

### API

Full API documentation is available can be found in the [`docs/`](docs/modules/node_debt_snowball.html) directory.

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
        "accruedInterest": "number",
        "additionalPayment": "number",
        "paymentAmount": "number"
      }
      // more accounts...
    ]
  }
  // more payment periods...
]
```

A full sample response can be found at [`examples/response.json`](examples/response.json).

## Contributing

Clone the repo and install the dependencies:

```bash
git clone https://github.com/nielse63/node-debt-snowball.git
cd node-debt-snowball
npm ci
```

### Prerequisites

Node `v16.20.0`:

```bash
nvm use v16.20.0
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
