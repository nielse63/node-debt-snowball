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

    // validate props
    this.validateProperties();
  }

  set(key, value) {
    this[key] = value;
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
    const { principal, interest } = this;
    const monthlyInterestRate = interest / 12 / 100;
    const monthlyAccruedInterest = principal * monthlyInterestRate;
    return Account.formatFloat(monthlyAccruedInterest);
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
    const { principal, minPayment, additionalPayment, payments } = this;
    let newBalance = principal;
    newBalance += this.calculateMonthlyInterest();
    let paymentAmount = minPayment + additionalPayment;
    const isComplete = newBalance - paymentAmount <= 0;
    if (isComplete) {
      paymentAmount = newBalance;
    }
    this.principal = Account.formatFloat(newBalance - paymentAmount);
    const payment = new Payment({
      amount: paymentAmount,
      index: payments.length,
    });
    this.payments.push(payment);
    if (isComplete) {
      this.payoffDate = this.getPayoffDate();
    }
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
    return get(lastPayment, 'date');
  }

  // dispatch(event, ...args) {
  //   if(this._boundEvents.has(event)) {
  //     const callback = this._boundEvents.get(event);
  //     callback(...args);
  //   }
  // }

  // on(event, callback){
  //   this._boundEvents.set(event, callback);
  // }

  // off(event){
  //   if(this._boundEvents.has(event)) {
  //     this._boundEvents.delete(event)
  //   }
  // }
}
