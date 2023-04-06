const snowball = require('..');

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
console.log(JSON.stringify(repaymentPlan, null, '  '));
