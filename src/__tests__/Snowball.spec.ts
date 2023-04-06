import Snowball from '../Snowball';
import fixture from '../__fixtures__/data';
import accounts from '../__fixtures__/input';

const additionalPayment = 100;

describe('Snowball', () => {
  let snowball;
  beforeEach(() => {
    snowball = new Snowball(accounts, additionalPayment);
  });

  it('should set default additionalPayment value', () => {
    snowball = new Snowball(accounts);
    expect(snowball.additionalPayment).toEqual(0);
  });

  describe('setAccounts', () => {
    it('should sort accounts by interest rate descending', () => {
      snowball = new Snowball([
        {
          name: 'Student Loan',
          interest: 6.55,
          balance: 1000,
          minPayment: 40,
        },
        {
          name: 'Credit Card',
          interest: 14.99,
          balance: 5000,
          minPayment: 120,
        },
      ]);
      expect(snowball.accounts[0].name).toEqual('Credit Card');
    });

    it('should maintain order if interest rates are the same', () => {
      snowball = new Snowball([
        {
          name: 'Student Loan',
          interest: 6.55,
          balance: 1000,
          minPayment: 40,
        },
        {
          name: 'Credit Card',
          interest: 6.55,
          balance: 5000,
          minPayment: 120,
        },
      ]);
      expect(snowball.accounts[0].name).toEqual('Student Loan');
    });
  });

  describe('getCurrentBalance', () => {
    it('should calculate sum balance correctly', () => {
      const balance = snowball.getCurrentBalance();
      expect(balance).toEqual(6000);
    });
  });

  describe('setNewAdditionalPayment', () => {
    it('should return a number', () => {
      const value = snowball.setNewAdditionalPayment(0);
      expect(value).toBeNumber();
    });

    it('should not set additionalPayment value if below 0', () => {
      const value = snowball.setNewAdditionalPayment(additionalPayment * 2);
      expect(value).toEqual(0);
    });
  });

  describe('makePaymentForAccount', () => {
    let account;
    beforeEach(() => {
      [account] = snowball.accounts;
    });

    it('should return object with expected shape', () => {
      const payment = snowball.makePaymentForAccount(account);
      expect(payment).toBeObject();
      expect(payment.name).toEqual(account.name);
      expect(payment.startingBalance).toBeNumber();
      expect(payment.endingBalance).toBeNumber();
      expect(payment.paymentAmount).toBeNumber();
      expect(payment.additionalPayment).toBeNumber();
    });

    it('should update the additionalPayment prop after the first account is used', () => {
      const spy = jest.spyOn(snowball, 'setNewAdditionalPayment');
      const payment = snowball.makePaymentForAccount(account);
      expect(spy).toHaveBeenCalled();
      expect(payment.additionalPayment).toEqual(additionalPayment);
      expect(snowball.currentAdditionalPayment).toEqual(0);
    });

    it('should prevent account making a payment if balance is <= 0', () => {
      account.balance = 0;
      const spy = jest.spyOn(account, 'makePayment');
      const payment = snowball.makePaymentForAccount(account);
      expect(spy).not.toHaveBeenCalled();
      expect(payment.startingBalance).toEqual(0);
      expect(payment.endingBalance).toEqual(0);
    });
  });

  describe('makePaymentsForMonth', () => {
    it('should return object with expected shape', () => {
      const results = snowball.makePaymentsForMonth();
      expect(results).toBeObject();
      expect(results.balance).toBeNumber();
      expect(results.accounts).toBeArray();
    });

    it('should calculate balance correctly', () => {
      const results = snowball.makePaymentsForMonth();
      const expected =
        results.accounts[0].endingBalance + results.accounts[1].endingBalance;
      expect(results.balance).toEqual(expected);
    });

    it('should update balance', () => {
      const oldBalance = snowball.balance;
      const results = snowball.makePaymentsForMonth();
      expect(snowball.balance).toBeLessThan(oldBalance);
      expect(results.balance).toEqual(snowball.balance);
    });
  });

  describe('createPaymentPlan', () => {
    it('should return an array', () => {
      const paymentPlan = snowball.createPaymentPlan();
      expect(paymentPlan).toBeArray();
      expect(paymentPlan.length).toEqual(fixture.length);
    });

    it('should call makePaymentsForMonth', () => {
      const spy = jest.spyOn(snowball, 'makePaymentsForMonth');
      snowball.createPaymentPlan();
      expect(spy).toHaveBeenCalled();
    });

    it('should calculate correct balances', () => {
      const paymentPlan = snowball.createPaymentPlan();
      paymentPlan.forEach(({ balance }, i) => {
        const fixtureBalance = parseFloat(fixture[i].Balance.replace('$', ''));
        expect(balance).toEqual(fixtureBalance);
      });
    });
  });
});
