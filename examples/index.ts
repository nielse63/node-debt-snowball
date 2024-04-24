import snowball, { AccountObject } from '..';

const accounts: AccountObject[] = [
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
