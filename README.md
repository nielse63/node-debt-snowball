# node-debt-snowball

> Node script to calculate debt repayment using the snowball method

Given an array of accounts and additional payment amount, `node-debt-snowball` will calculate the date of your final payment and an array of all the payment's you'll make.

## Installation

```bash
npm iinstall --save node-debt-snowball
```

## API

`node-debt-snowball` is a function with two arguments and returns an object:

### Arguments

| Argument            | Type     | Description                           |
| ------------------- | -------- | ------------------------------------- |
| `accounts`          | `Array`  | Array of objects (see below)          |
| `additionalPayment` | `number` | Additional amount to apply each month |

### Response

| Key | Type | Description |
| --- | --- | --- |
| `payoffDate` | `Date` | The month and year of your last payment |
| `payments` | `Array` | Array of objects representing each month payments are made |

## Example

```js
const snowball = require('node-debt-snowball');

const accounts = [
  {
    name: 'Student Loan',
    principal: 10000,
    interest: 4.25,
    minPayment: 75,
  },
  {
    name: 'Credit Card',
    principal: 5000,
    interest: 15.75,
    minPayment: 90,
  },
];
const additionalPayment = 100;

const results = snowball(accounts, additionalPayment);
/**
{
  payoffDate: // Date object - the month of your final payment
  payments: [
    {
      date: // Date object - month and year of payments
      totalBalance: // number - the sum balance of all accounts after making payments
      accounts: [
        {
          name: 'Studient Loan',
          payment: number // the payment amount
          balance: number // the balance of this account after payment
        },
        ...
      ]
    }
  ]
}
 */
```
