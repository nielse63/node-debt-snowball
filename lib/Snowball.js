const Account = require('./Account');
const toCurrency = require('./helpers/toCurrency');

/**
 * @class Snowball
 */
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
