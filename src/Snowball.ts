import Account from './Account';
import { toCurrency } from './helpers';
import { AccountOptions, Payment } from './types';

class Snowball {
  accounts: Account[] = [];
  additionalPayment: number;
  startingBalance: number;
  currentBalance: number;
  appliedAdditionalPayment = 0;
  accruedAdditionalPayment = 0;
  unappliedAdditionalPayment = 0;
  paymentPlan: Payment[] = [];

  constructor(accounts: AccountOptions[], additionalPayment = 0) {
    this.setAccounts(accounts);
    this.startingBalance = this.getCurrentBalance();
    this.currentBalance = this.startingBalance;
    this.additionalPayment = additionalPayment;
  }

  parseAccounts(accounts: AccountOptions[]) {
    if (!Array.isArray(accounts)) {
      throw new Error('accounts must be an array');
    }

    const defaultAccount = {
      name: '',
      interest: 0,
      balance: 0,
      minPayment: 0,
    };

    return accounts
      .filter((account) => {
        return account?.constructor === Object;
      })
      .map((account) => {
        return {
          ...defaultAccount,
          ...account,
        };
      });
  }

  setAccounts(accounts: AccountOptions[]) {
    this.accounts = this.parseAccounts(accounts)
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

  makePaymentForAccount = (account: Account) => {
    const additionalPayment =
      this.appliedAdditionalPayment + this.accruedAdditionalPayment;
    if (this.appliedAdditionalPayment) {
      this.appliedAdditionalPayment = 0;
    }
    if (this.accruedAdditionalPayment) {
      this.accruedAdditionalPayment = 0;
    }
    const payment = account.makePayment(toCurrency(additionalPayment));
    if (!payment.endingBalance) {
      this.accruedAdditionalPayment =
        account.minPayment - payment.paymentAmount;
      this.unappliedAdditionalPayment = account.minPayment;
    }

    return {
      name: account.name,
      ...payment,
    };
  };

  makePaymentsForMonth() {
    if (this.unappliedAdditionalPayment) {
      this.additionalPayment += this.unappliedAdditionalPayment;
      this.unappliedAdditionalPayment = 0;
    }
    this.appliedAdditionalPayment = this.additionalPayment;
    const accounts = this.accounts
      .filter((account) => {
        return account.balance > 0;
      })
      .map(this.makePaymentForAccount);
    this.currentBalance = this.getCurrentBalance();

    return {
      balance: this.currentBalance,
      accounts,
    };
  }

  /**
   * Generates a payment plan
   *
   * @public
   * @returns {Payment[]} - An array of payments
   */
  createPaymentPlan() {
    this.paymentPlan = [];

    while (this.currentBalance > 0) {
      const payment = this.makePaymentsForMonth();
      this.paymentPlan.push(payment);
    }
    return this.paymentPlan;
  }
}

export default Snowball;
