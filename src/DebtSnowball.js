import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import Account from './Account';
import '../config/typedef';

/**
 * Primary class to generate a debt repayment plan
 * @export
 * @class DebtSnowball
 */
export default class DebtSnowball {
  /**
   * Maps over array of accounts to return a sum of all balances
   * @static
   * @param {Array} accounts - Array of account objects
   * @returns {number}
   * @memberof DebtSnowball
   */
  static getTotalBalance(accounts) {
    return Number(
      accounts
        .map(({ balance }) => balance)
        .reduce((a, b) => a + b, 0)
        .toFixed(2)
    );
  }

  /**
   * Sorts accounts by interest rate in descending order
   * @static
   * @param {Array} accounts
   * @returns {Array}
   * @memberof DebtSnowball
   */
  static sortAccounts(accounts) {
    return accounts.sort((a, b) => {
      if (a.interest > b.interest) return -1;
      if (a.interest < b.interest) return 1;
      return a.principal < b.principal;
    });
  }

  /**
   * Instatiates an Account object for each plain object, then sorts the array
   *
   * @static
   * @param {Array} accounts
   * @returns {Array}
   * @memberof DebtSnowball
   */
  static createAccounts(accounts) {
    const array = accounts.map((options) => new Account(options));
    return DebtSnowball.sortAccounts(array);
  }

  /**
   * Array of Accounts
   * @type {Array}
   * @memberof DebtSnowball
   */
  accounts = [];

  /**
   * The additional amount to apply to repayments each month
   * @type {number}
   * @memberof DebtSnowball
   */
  additionalPayment = 0;

  /**
   * The sum of all account balances
   * @type {number}
   * @memberof DebtSnowball
   */
  totalBalance = 0;

  /**
   * The object returned by `simulate` - includes the final
   * repayment month and an array of oayment objects
   * @type {Object}
   * @memberof DebtSnowball
   */
  results = {
    payoffDate: '',
    payments: [],
  };

  /**
   * Creates an instance of DebtSnowball.
   * @param {[]} accounts - An array of plain objects representing accounts
   * @param {number} additionalPayment - The additional amount applied to payments each month
   * @memberof DebtSnowball
   */
  constructor(accounts = [], additionalPayment = 0) {
    this.additionalPayment = additionalPayment;
    this.accounts = DebtSnowball.createAccounts(accounts);
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
      addMonths(new Date(), this.results.payments.length + 1),
      'MM/yyyy'
    );
  }

  makePayments() {
    this.setAddiitionalAmount();

    const accounts = this.accounts
      .filter(({ principal }) => principal > 0)
      .map(this.makePaymentForAccount);
    this.totalBalance = DebtSnowball.getTotalBalance(accounts);
    const date = this.getPaymentDate();
    this.results.payoffDate = date;
    return {
      date,
      totalBalance: this.totalBalance,
      accounts,
    };
  }

  simulate() {
    let shouldContinue = true;
    while (shouldContinue) {
      const results = this.makePayments();
      this.results.payments.push(results);
      if (this.totalBalance <= 0) {
        shouldContinue = false;
      }
    }
    return this.results;
  }
}
