import Account from './Account';
import Results from './Results';
import { REPAYMENT_STRATEGIES } from './constants';
import { toCurrency } from './helpers';
import {
  AccountObject,
  AccountObjectKeys,
  OrderDirection,
  RepaymentStrategy,
} from './types';

class Snowball {
  accounts: Account[] = [];
  additionalPayment: number;
  balanceStart: number;
  currentBalance: number;
  snowballAmount: number;
  strategy: string;

  constructor(
    accounts: AccountObject[],
    additionalPayment = 0,
    strategy = REPAYMENT_STRATEGIES.AVALANCHE
  ) {
    this.strategy = strategy;
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

  sortAccounts(
    accounts: AccountObject[],
    key: AccountObjectKeys = AccountObjectKeys.interest,
    order: OrderDirection = OrderDirection.descending
  ) {
    const firstValue = order === OrderDirection.ascending ? 1 : -1;
    const secondValue = order === OrderDirection.ascending ? -1 : 1;
    return accounts.sort((a, b) => {
      if (a[key] > b[key]) return firstValue;
      if (a[key] < b[key]) return secondValue;
      return 0;
    });
  }

  getSortKeyAndOrder() {
    switch (this.strategy) {
      case RepaymentStrategy.snowball:
        return {
          key: AccountObjectKeys.balance,
          order: OrderDirection.ascending,
        };
      case RepaymentStrategy.avalanche:
      default:
        return {
          key: AccountObjectKeys.interest,
          order: OrderDirection.descending,
        };
    }
  }

  setAccounts(accounts: AccountObject[]) {
    const parsedAccounts = this.parseAccounts(accounts);
    const { key, order } = this.getSortKeyAndOrder();
    const sortedAccounts = this.sortAccounts(parsedAccounts, key, order);
    return sortedAccounts.map((account) => new Account(account));
  }

  getCurrentBalance() {
    const sum = this.accounts
      .map(({ balance }) => balance)
      .reduce((a, b) => a + b, 0);
    return toCurrency(sum);
  }

  makePaymentForAccount(account: Account) {
    const payment = account.makePayment(this.snowballAmount);
    if (payment.balanceEnd > 0) {
      this.snowballAmount = 0;
    } else if (this.balanceStart > 0) {
      this.snowballAmount = toCurrency(
        this.additionalPayment + account.minPayment - payment.paymentAmount
      );
    }

    return { ...payment };
  }

  makePaymentsForMonth() {
    this.snowballAmount = this.additionalPayment;
    const accounts = this.accounts.map((account) => {
      return this.makePaymentForAccount(account);
    });
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
