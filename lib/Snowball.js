const Account = require('./Account');
const toCurrency = require('./helpers/toCurrency');

// steps of execution
// 1. sort accounts by interest rate and create Account objects
// 2. get sum of account balances
// 3. while sum of account balances is greater than 0...
// 1. for each account (pass in local additional payment var)...
// 1. calculate the accrued interest for the month
// 2. add the interest to the current account balance
// 3. add the min and additional payment amounts
// 4. if the total payment amount is greater than the current account balance, total payment is equal to account balance
// 5. subtract total payment amount from current account balance
// 6. return starting balance, ending balance, payment amount, interest accrued

class Snowball {
  accounts = [];
  additionalPayment = 0;
  balance = 0;
  currentAdditionalPayment = 0;
  paymentPlan = [];

  constructor(accounts, additionalPayment = 0) {
    this.setAccounts(accounts);
    const balance = this.getCurrentBalance();
    this.balance = balance;
    this.additionalPayment = additionalPayment;
    this.currentAdditionalPayment = additionalPayment;
  }

  setAccounts(accounts) {
    this.accounts = accounts
      .sort((a, b) => {
        if (a.interest > b.interest) return -1;
        if (a.interest < b.interest) return 1;
        return 0;
      })
      .map((account) => new Account(account));
    return this.accounts;
  }

  getCurrentBalance() {
    const sum = this.accounts
      .map(({ balance }) => balance)
      .reduce((a, b) => a + b, 0);
    return toCurrency(sum);
  }

  setNewAdditionalPayment(value) {
    const newAdditionalPayment =
      (this.currentAdditionalPayment || this.additionalPayment) - value;
    return newAdditionalPayment < 0 ? 0 : newAdditionalPayment;
  }

  makePaymentForAccount = (account) => {
    if (account.balance <= 0) {
      return {
        name: account.name,
        startingBalance: 0,
        endingBalance: 0,
        paymentAmount: 0,
        additionalPayment: 0,
      };
    }
    const additionalPayment = this.currentAdditionalPayment;
    const payment = account.makePayment(additionalPayment);

    this.currentAdditionalPayment = this.setNewAdditionalPayment(
      payment.additionalPayment
    );

    return {
      name: account.name,
      ...payment,
    };
  };

  makePaymentsForMonth() {
    this.currentAdditionalPayment = this.additionalPayment;
    const accounts = this.accounts.map(this.makePaymentForAccount);
    this.balance = this.getCurrentBalance();

    return {
      balance: this.balance,
      accounts,
    };
  }

  createPaymentPlan() {
    this.paymentPlan = [];

    while (this.balance > 0) {
      const payment = this.makePaymentsForMonth();
      this.paymentPlan.push(payment);
    }
    return this.paymentPlan;
  }
}

module.exports = Snowball;
