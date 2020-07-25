import Account from './Account';

export default class DebtSnowball {
  constructor(accounts = []) {
    this.accounts = this.createAccounts(accounts);
  }

  createAccounts(accounts) {
    this.accounts = accounts.map((account) => new Account(account));
    return this.accounts;
  }
}
