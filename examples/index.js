const fs = require('fs');
const path = require('path');
const { snowball } = require('../dist/index.js');

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

const repaymentPlan = snowball(accounts, additionalPayment, 'avalanche');
console.log('repaymentPlan', repaymentPlan);

// update the example values and run `npm run dev` to see the
// differences in `examples/response.json`
fs.writeFileSync(
  path.join(__dirname, 'response.json'),
  JSON.stringify(repaymentPlan, null, '  ') + '\n'
);
