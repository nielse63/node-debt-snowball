import Account from './Account';
import Results from './Results';
import { toCurrency } from './helpers';
import type { AccountObject } from './types';

class Snowball {
  accounts: Account[] = [];
  additionalPayment: number;
  balanceStart: number;
  currentBalance: number;
  snowballAmount: number;

  constructor(accounts: AccountObject[], additionalPayment = 0) {
    this.accounts = this.setAccounts(accounts);
    this.balanceStart = this.getCurrentBalance();
    this.currentBalance = this.balanceStart;
    this.additionalPayment = additionalPayment;
    this.snowballAmount = additionalPayment;
  }

  parseAccounts(accounts: AccountObject[]) {
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

  setAccounts(accounts: AccountObject[]) {
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
    const payment = account.makePayment(this.snowballAmount);
    if (payment.balanceEnd > 0) {
      this.snowballAmount = 0;
    } else if (this.balanceStart > 0) {
      this.snowballAmount = toCurrency(
        this.additionalPayment + account.minPayment - payment.paymentAmount
      );
    }

    return {
      name: account.name,
      ...payment,
    };
  };

  makePaymentsForMonth() {
    this.snowballAmount = this.additionalPayment;
    const accounts = this.accounts.map(this.makePaymentForAccount);
    this.currentBalance = this.getCurrentBalance();

    return {
      balance: this.currentBalance,
      accounts,
    };
  }

  /**
   * Generates a payment plan
   * @returns {Payment[]} - An array of payments
   */
  createPaymentPlan() {
    const paymentPlan = [];

    while (this.currentBalance > 0) {
      const payment = this.makePaymentsForMonth();
      paymentPlan.push(payment);
    }
    return new Results(paymentPlan);
  }
}

export default Snowball;
