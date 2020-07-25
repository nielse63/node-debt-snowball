import omit from 'lodash/omit';
import Account from '../Account';
import Payment from '../Payment';

const options = {
  name: 'test',
  principal: 1000,
  interest: 10.0,
  minPayment: 50,
  additionalPayment: 25,
};

describe('Account', () => {
  it('should be defined', () => {
    expect(Account).toBeDefined();
  });

  describe('properties', () => {
    let account;
    beforeEach(() => {
      account = new Account(options);
    });

    it('should have expected properties', () => {
      Object.keys(options).forEach((key) => {
        expect(account[key]).toBeDefined();
      });
      expect(account.errors).toBeDefined();
    });
  });

  describe('constructor', () => {
    it('should handle an empty object in the args', () => {
      const account = new Account({});
      Object.keys(options).forEach((key) => {
        expect(account[key]).toBeDefined();
      });
    });

    it('should set property values from constructor argument', () => {
      const account = new Account(options);
      Object.entries(options).forEach(([key, value]) => {
        expect(account[key]).toEqual(value);
      });
      expect(account.errors.length).toEqual(0);
    });

    it('should set an error when a required field is empty', () => {
      const account = new Account(omit(options, ['name']));
      expect(account.errors.length).toEqual(1);
      expect(account.errors[0]).toEqual(
        "The proptery 'name' is required  on the Account class"
      );
    });
  });

  describe('methods', () => {
    let account;
    beforeEach(() => {
      account = new Account(options);
    });

    describe('calculateMonthlyInterest', () => {
      it('should accurately calculate the accrued monthly interest', () => {
        const results = account.calculateMonthlyInterest();
        expect(results).toEqual(8.33);
      });

      it('should return a number type', () => {
        const results = account.calculateMonthlyInterest();
        expect(typeof results).toEqual('number');
      });
    });

    describe('makeMonthlyPayment', () => {
      it('should accurately calculate the remaining balance after interest is added and payment is deducted', () => {
        const { principal, minPayment, additionalPayment } = options;
        expect(account.principal).toEqual(principal);
        account.makeMonthlyPayment();
        const accruedInterest = 8.33;
        const expectedValue =
          principal + accruedInterest - (minPayment + additionalPayment);
        expect(account.principal).toEqual(expectedValue);
      });

      it('should return a Payment object', () => {
        const payment = account.makeMonthlyPayment();
        expect(payment).toBeInstanceOf(Payment);
        ['amount', 'index', 'date'].forEach((prop) => {
          expect(payment[prop]).toBeDefined();
        });
      });

      it('should execute calculateMonthlyInterest', () => {
        const spy = jest.spyOn(account, 'calculateMonthlyInterest');
        account.makeMonthlyPayment();
        expect(spy).toHaveBeenCalled();
      });

      it('should add a new payment object to the payments property', () => {
        expect(account.payments.length).toEqual(0);
        account.makeMonthlyPayment();
        expect(account.payments.length).toEqual(1);
      });
    });
  });
});
