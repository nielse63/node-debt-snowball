import DebtSnowball from '../DebtSnowball';
import accounts from '../__mocks__/accounts.mock';

const additionalPayment = 100;

describe('DebtSnowball', () => {
  it('should be defined', () => {
    expect(DebtSnowball).toBeDefined();
  });

  describe('properties', () => {
    it('should have expected properties', () => {
      const snowball = new DebtSnowball(accounts, additionalPayment);
      ['accounts'].forEach((key) => {
        expect(snowball[key]).toBeDefined();
      });
    });
  });

  describe('constructor', () => {
    it('should handle empty args', () => {
      const snowball = new DebtSnowball();
      expect(snowball.accounts).toEqual([]);
    });

    it('should set accounts array on init', () => {
      const snowball = new DebtSnowball(accounts, additionalPayment);
      expect(snowball.accounts.length).toEqual(accounts.length);
    });
  });

  describe('methods', () => {
    let snowball;
    beforeAll(() => {
      snowball = new DebtSnowball(accounts, additionalPayment);
    });

    describe('createPaymentPlan', () => {
      let results;
      beforeAll(() => {
        results = snowball.createPaymentPlan();
      });

      it('should return expected shape and data types', () => {
        expect(results.payoffDate).toBeValidDate();
        expect(Array.isArray(results.payments)).toBe(true);
      });

      it('should have payments array with expected shape', () => {
        const payment = results.payments[0];
        expect(payment.date).toBeValidDate();
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
