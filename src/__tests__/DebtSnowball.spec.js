import DebtSnowball from '../DebtSnowball';

const accounts = [
  {
    name: 'account 1',
    principal: 1000,
    interest: 10.0,
    minPayment: 50,
  },
  {
    name: 'account 2',
    principal: 500,
    interest: 25.5,
    minPayment: 100,
  },
  {
    name: 'account 3',
    principal: 5000,
    interest: 15,
    minPayment: 100,
  },
  {
    name: 'account 4',
    principal: 1000,
    interest: 15,
    minPayment: 100,
  },
];

const options = {
  accounts,
  additionalPayment: 100,
};

describe('DebtSnowball', () => {
  it('should be defined', () => {
    expect(DebtSnowball).toBeDefined();
  });

  describe('properties', () => {
    it('should have expected properties', () => {
      const snowball = new DebtSnowball(options);
      ['accounts'].forEach((key) => {
        expect(snowball[key]).toBeDefined();
      });
    });
  });

  describe('constructor', () => {
    it('should handle empty args', () => {
      const snowball = new DebtSnowball({});
      expect(snowball.accounts).toEqual([]);
    });

    it('should set accounts array on init', () => {
      const snowball = new DebtSnowball(options);
      expect(snowball.accounts.length).toEqual(accounts.length);
    });
  });

  describe('methods', () => {
    let snowball;
    beforeAll(() => {
      snowball = new DebtSnowball(options);
    });

    describe('run', () => {
      let results;
      beforeAll(() => {
        results = snowball.run();
      });

      it('should return expected shape and data types', () => {
        expect(typeof results.payoffDate).toEqual('string');
        expect(Array.isArray(results.payments)).toBe(true);
      });

      it('should have payments array with expected shape', () => {
        const payment = results.payments[0];
        expect(typeof payment.date).toEqual('string');
        expect(typeof payment.totalBalance).toEqual('number');
        expect(Array.isArray(payment.accounts)).toBe(true);
      });

      it('results.payments[n].accounts should match shape', () => {
        const { accounts: resultsAccounts } = results.payments[0];
        const account = resultsAccounts[0];
        expect(typeof account.name).toEqual('string');
        expect(typeof account.payment).toEqual('number');
        expect(typeof account.balance).toEqual('number');
      });
    });
  });
});
