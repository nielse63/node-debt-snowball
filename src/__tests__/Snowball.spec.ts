import Snowball from '../Snowball';

const accounts = [
  {
    name: 'Credit Card',
    interest: 14.99,
    balance: 1000,
    minPayment: 75,
  },
  {
    name: 'Student Loan',
    interest: 4.75,
    balance: 7500,
    minPayment: 150,
  },
];
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

  describe('parseAccounts', () => {
    it('should throw error if accounts is not an array', () => {
      expect(() => snowball.parseAccounts('foo')).toThrow();
    });

    it('should filter non-object elements', () => {
      const output = snowball.parseAccounts(['foo', 'bar', 123, accounts[0]]);
      expect(output).toBeArrayOfSize(1);
      expect(output).toEqual([accounts[0]]);
    });

    it('should set default values in objects', () => {
      const output = snowball.parseAccounts([accounts[0], {}]);
      expect(output).toBeArrayOfSize(2);
      expect(output[1]).toEqual({
        name: '',
        interest: 0,
        balance: 0,
        minPayment: 0,
      });
    });

    it('should return an array of parsed account objects', () => {
      const output = snowball.parseAccounts(accounts);
      expect(output).toEqual([
        {
          name: 'Credit Card',
          interest: 14.99,
          balance: 1000,
          minPayment: 75,
        },
        {
          name: 'Student Loan',
          interest: 4.75,
          balance: 7500,
          minPayment: 150,
        },
      ]);
    });
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
      expect(balance).toEqual(8500);
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
      const oldBalance = snowball.startingBalance;
      const results = snowball.makePaymentsForMonth();
      expect(snowball.currentBalance).toBeLessThan(oldBalance);
      expect(results.balance).toEqual(snowball.currentBalance);
    });
  });

  describe('createPaymentPlan', () => {
    it('should return an array', () => {
      const paymentPlan = snowball.createPaymentPlan();
      expect(paymentPlan).toBeArray();
      expect(paymentPlan[0]).toBeObject();
    });

    it('should call makePaymentsForMonth', () => {
      const spy = jest.spyOn(snowball, 'makePaymentsForMonth');
      snowball.createPaymentPlan();
      expect(spy).toHaveBeenCalled();
    });

    it('should calculate correct balances', () => {
      const paymentPlan = snowball.createPaymentPlan();
      expect(paymentPlan[1].balance).toEqual(7931.85);
      expect(paymentPlan[4].accounts[0].paymentAmount).toEqual(175);
      expect(paymentPlan[5].accounts[0].paymentAmount).toEqual(168.99);
      expect(paymentPlan[6].accounts).toBeArrayOfSize(1);
    });

    it('should match snapshot', () => {
      const paymentPlan = snowball.createPaymentPlan();
      expect(paymentPlan).toMatchSnapshot();
    });
  });
});
