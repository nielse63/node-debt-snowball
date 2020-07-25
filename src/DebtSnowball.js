import Account from './Account';

export default class DebtSnowball {
  accounts = [];

  additionalPayment = 0;

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

  generator() {
    const firstAccount = this.accounts.find((account) => {
      return account.principal > 0;
    });
    if (!firstAccount) return 0;
    firstAccount.set('additionalPayment', this.additionalPayment);

    const results = this.accounts
      .filter(({ principal }) => principal > 0)
      .map((account) => {
        account.makeMonthlyPayment();
        const { principal, minPayment } = account;
        if (principal <= 0) {
          this.additionalPayment += minPayment;
        }
        return principal;
      });
    return results.reduce((a, b) => a + b, 0);
  }

  // TODO: extract the payments and total remaining balance for each month
  // TODO: return object should look like: {payoffDate: '', payments: [{date: '', payments: {account1: 123, account2: 456}, totalBalance: 123}, ...]}
  run() {
    let shouldContinue = true;
    while (shouldContinue) {
      const remainingBalances = this.generator();
      if (remainingBalances <= 0) {
        shouldContinue = false;
      }
    }
    return this.accounts;
  }
}
