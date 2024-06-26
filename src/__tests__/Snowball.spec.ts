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

  describe('sortAccounts', () => {
    it('should sort accounts by interest rate descending for avalanche strategy', () => {
      const sorted = snowball.sortAccounts(accounts);
      expect(sorted[0].name).toEqual('Credit Card');
    });

    it('should sort accounts by balance ascending for snowball strategy', () => {
      snowball = new Snowball(
        [
          {
            name: 'Credit Card',
            interest: 14.99,
            balance: 1000,
            minPayment: 75,
          },
          {
            name: 'Student Loan',
            interest: 4.75,
            balance: 900,
            minPayment: 150,
          },
        ],
        additionalPayment,
        'snowball'
      );
      expect(snowball.accounts[0].name).toEqual('Student Loan');
    });
  });

  describe('getSortKeyAndOrder', () => {
    it('should return correct key and order for avalanche strategy', () => {
      snowball.strategy = 'avalanche';
      const { key, order } = snowball.getSortKeyAndOrder();
      expect(key).toEqual('interest');
      expect(order).toEqual('descending');
    });

    it('should return correct key and order for snowball strategy', () => {
      snowball.strategy = 'snowball';
      const { key, order } = snowball.getSortKeyAndOrder();
      expect(key).toEqual('balance');
      expect(order).toEqual('ascending');
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
      expect(payment.balanceStart).toBeNumber();
      expect(payment.balanceEnd).toBeNumber();
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
        results.accounts[0].balanceEnd + results.accounts[1].balanceEnd;
      expect(results.balance).toEqual(expected);
    });

    it('should update balance', () => {
      const oldBalance = snowball.balanceStart;
      const results = snowball.makePaymentsForMonth();
      expect(snowball.currentBalance).toBeLessThan(oldBalance);
      expect(results.balance).toEqual(snowball.currentBalance);
    });
  });

  describe('createPaymentPlan', () => {
    it('should return an array', () => {
      const { payments } = snowball.createPaymentPlan();
      expect(payments).toBeArray();
      expect(payments[0]).toBeObject();
    });

    it('should call makePaymentsForMonth', () => {
      const spy = jest.spyOn(snowball, 'makePaymentsForMonth');
      snowball.createPaymentPlan();
      expect(spy).toHaveBeenCalled();
    });

    it('should calculate correct balances', () => {
      const { payments } = snowball.createPaymentPlan();
      expect(payments[1].balance).toEqual(7931.85);
      expect(payments[4].accounts[0].paymentAmount).toEqual(175);
      expect(payments[5].accounts[0].paymentAmount).toEqual(166.91);
    });

    it('should match snapshot for avalanche', () => {
      const payments = snowball.createPaymentPlan();
      expect(payments).toMatchSnapshot();
    });

    it('should match snapshot for snowball', () => {
      snowball = new Snowball(
        [
          {
            name: 'Credit Card',
            interest: 14.99,
            balance: 1000,
            minPayment: 75,
          },
          {
            name: 'Student Loan',
            interest: 4.75,
            balance: 900,
            minPayment: 50,
          },
        ],
        additionalPayment,
        'snowball'
      );
      const payments = snowball.createPaymentPlan();
      expect(payments).toMatchSnapshot();
    });
  });
});
