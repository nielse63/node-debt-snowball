import get from 'lodash/get';
import last from 'lodash/last';
import Payment from './Payment';

export default class Account {
  static requiredKeys = ['name', 'principal', 'interest', 'minPayment'];

  static formatFloat(value) {
    return Number(parseFloat(value).toFixed(2));
  }

  name = '';

  principal = 0;

  interest = 0;

  minPayment = 0;

  additionalPayment = 0;

  // not set in constructor (internal)
  initialBalance = 0;

  remainingBalance = 0;

  payments = [];

  payoffDate = new Date();

  errors = [];

  constructor({
    name = '',
    principal = 0,
    interest = 0,
    minPayment = 0,
    additionalPayment = 0,
  }) {
    // set props
    this.name = name;
    this.principal = principal;
    this.interest = interest;
    this.minPayment = minPayment;
    this.additionalPayment = additionalPayment;

    this.initialBalance = this.principal;
    this.remainingBalance = this.principal;

    // validate props
    this.validateProperties();
  }

  validateProperties() {
    Account.requiredKeys.forEach((key) => {
      if (!get(this, key)) {
        this.errors.push(
          `The proptery '${key}' is required  on the Account class`
        );
      }
    });
  }

  /**
   * @description
   * Calculates a single month's interest in dollars
   *
   * @returns {number} The interest payment for a single month
   * @memberof Account
   */
  calculateMonthlyInterest() {
    const { remainingBalance, interest } = this;
    const monthlyInterestRate = interest / 12 / 100;
    const monthlyAccruedInterest = remainingBalance * monthlyInterestRate;
    return Account.formatFloat(monthlyAccruedInterest);
  }

  /**
   * @description
   * Calculates a single month's interest, in dollars, and adds
   * that value to the remaining balance of the account
   *
   * @returns {number} The updated balance of the account
   * @memberof Account
   */
  addMonthlyInterest() {
    this.remainingBalance += this.calculateMonthlyInterest();
    return this.remainingBalance;
  }

  /**
   * @description
   * Subtracts the sum of minPayment and additionalPayment from
   * the remaining balance of the account
   *
   * @returns {Payment}
   * @memberof Account
   */
  makeMonthlyPayment() {
    this.addMonthlyInterest();
    const { remainingBalance, minPayment, additionalPayment, payments } = this;
    let paymentAmount = minPayment + additionalPayment;
    // const balanceWithInterest =
    if (remainingBalance - paymentAmount <= 0) {
      paymentAmount = remainingBalance;
    }
    this.remainingBalance = Account.formatFloat(
      remainingBalance - paymentAmount
    );
    const payment = new Payment({
      amount: paymentAmount,
      index: payments.length,
      remainingBalance: this.remainingBalance,
    });
    this.payments.push(payment);
    return payment;
  }

  /**
   * @description
   * Converts the array of Payment objects to plain objects
   *
   * @returns {Array}
   * @memberof Account
   */
  getPaymentsJSON() {
    return this.payments.map((payment) => payment.toJSON());
  }

  /**
   * @description
   * Evaluates the month and year when the account will be paid off
   *
   * @returns {Date}
   * @memberof Account
   */
  getPayoffDate() {
    const lastPayment = last(this.payments);
    this.payoffDate = get(lastPayment, 'date');
    return this.payoffDate;
  }

  /**
   * @description
   * Runs all calculation methods, returning an object of relavent
   * data pertaining to the account
   *
   * @returns {Object}
   * @memberof Account
   */
  run() {
    while (this.remainingBalance > 0) {
      this.makeMonthlyPayment();
    }
    return {
      payments: this.getPaymentsJSON(),
      payoffDate: this.getPayoffDate(),
    };
  }
}
