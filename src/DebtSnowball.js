import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import Account from './Account';

export default class DebtSnowball {
  static getTotalBalance(accounts) {
    return Number(
      accounts
        .map(({ balance }) => balance)
        .reduce((a, b) => a + b, 0)
        .toFixed(2)
    );
  }

  accounts = [];

  additionalPayment = 0;

  #totalBalance = 0;

  #payoffDate = 0;

  #results = {
    payoffDate: '',
    payments: [],
  };

  constructor({ accounts = [], additionalPayment = 0 }) {
    this.additionalPayment = additionalPayment;
    this.accounts = this.createAccounts(accounts);
  }

  /**
   * @description
   * Given an array of objects, instatiate new Account objects for each element
   *
   * @param {Array} accounts
   * @returns {Array}
   * @memberof DebtSnowball
   */
  createAccounts(accounts) {
    this.accounts = accounts.map((options) => new Account(options));
    return this.sortAccounts();
  }

  sortAccounts() {
    return this.accounts.sort((a, b) => {
      if (a.interest > b.interest) return -1;
      if (a.interest < b.interest) return 1;
      return a.principal < b.principal;
    });
  }

  setAddiitionalAmount() {
    const firstAccount = this.accounts.find((account) => {
      return account.principal > 0;
    });
    firstAccount.set('additionalPayment', this.additionalPayment);
  }

  makePaymentForAccount = (account) => {
    const { minPayment, name } = account;
    const payment = account.makeMonthlyPayment();
    if (account.principal <= 0) {
      this.additionalPayment += minPayment;
    }
    return {
      name,
      payment: payment.amount,
      balance: account.principal,
    };
  };

  getPaymentDate() {
    return format(
      addMonths(new Date(), this.#results.payments.length + 1),
      'MM/yyyy'
    );
  }

  makePayments() {
    this.setAddiitionalAmount();

    const accounts = this.accounts
      .filter(({ principal }) => principal > 0)
      .map(this.makePaymentForAccount);
    this.#totalBalance = DebtSnowball.getTotalBalance(accounts);
    const date = this.getPaymentDate();
    this.#payoffDate = date;
    return {
      date,
      totalBalance: this.#totalBalance,
      accounts,
    };
  }

  run() {
    let shouldContinue = true;
    while (shouldContinue) {
      const results = this.makePayments();
      this.#results.payments.push(results);
      if (this.#totalBalance <= 0) {
        shouldContinue = false;
      }
    }
    return {
      ...this.#results,
      payoffDate: this.#payoffDate,
    };
  }
}
