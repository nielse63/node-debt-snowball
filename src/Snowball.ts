import Account from './Account';
import { toCurrency } from './helpers';
import { AccountConfig } from './types';

export type Payment = {
  balance: number;
  accounts: Account[];
};

class Snowball {
  accounts: Account[] = [];
  additionalPayment: number;
  startingBalance: number;
  currentBalance: number;
  appliedAdditionalPayment = 0;
  accruedAdditionalPayment = 0;
  unappliedAdditionalPayment = 0;
  paymentPlan: Payment[] = [];

  constructor(accounts: AccountConfig[], additionalPayment = 0) {
    this.setAccounts(accounts);
    this.startingBalance = this.getCurrentBalance();
    this.currentBalance = this.startingBalance;
    this.additionalPayment = additionalPayment;
  }

  parseAccounts(accounts: AccountConfig[]) {
    if (!Array.isArray(accounts)) {
      throw new Error('accounts must be an array');
    }

    return accounts
      .filter((account) => {
        return account?.constructor === Object;
      })
      .map((account) => {
        return {
          // @ts-expect-error set default values for account object
          name: '',
          // @ts-expect-error set default values for account object
          interest: 0,
          // @ts-expect-error set default values for account object
          balance: 0,
          // @ts-expect-error set default values for account object
          minPayment: 0,
          ...account,
        };
      });
  }

  setAccounts(accounts: AccountConfig[]) {
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

  createPaymentPlan() {
    this.paymentPlan = [];

    while (this.currentBalance > 0) {
      const payment = this.makePaymentsForMonth();
      // @ts-expect-error payment is of valid type
      this.paymentPlan.push(payment);
    }
    return this.paymentPlan;
  }
}

export default Snowball;
