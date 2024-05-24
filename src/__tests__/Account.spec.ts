import Account from '../Account';

const input = [
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
const [creditCard] = input;

const getMonthlyInterest = (object) => {
  const interest = object.interest / 100;
  return Number(((object.balance * interest) / 12).toFixed(2));
};
const additionalPayment = 100;

describe('Account', () => {
  let account;
  beforeEach(() => {
    account = new Account(creditCard);
  });

  describe('constructor', () => {
    it('should throw errors for 0 values', () => {
      expect(() => {
        new Account({ name: 'test', balance: 0, interest: 0, minPayment: 0 });
      }).toThrow();
      expect(() => {
        new Account({ name: 'test', balance: 100, interest: 0, minPayment: 0 });
      }).toThrow();
      expect(() => {
        new Account({
          name: 'test',
          balance: 100,
          interest: 10,
          minPayment: 0,
        });
      }).toThrow();
    });
  });

  describe('makePayment', () => {
    it('should return object with defined shape', () => {
      const payment = account.makePayment(additionalPayment);
      expect(payment).toBeObject();

      expect(payment.balanceStart).toBeNumber();
      expect(payment.balanceStart).toEqual(creditCard.balance);

      expect(payment.balanceEnd).toBeNumber();

      expect(payment.paymentAmount).toBeNumber();
      expect(payment.paymentAmount).toEqual(
        creditCard.minPayment + additionalPayment
      );

      expect(payment.additionalPayment).toBeNumber();
      expect(payment.additionalPayment).toEqual(additionalPayment);
    });

    it('should default additionalPayment to 0', () => {
      const payment = account.makePayment();
      expect(payment.additionalPayment).toEqual(0);
    });

    it('should accurately calculate new balance', () => {
      const interest = getMonthlyInterest(creditCard);
      const balanceEnd =
        creditCard.balance +
        interest -
        (creditCard.minPayment + additionalPayment);
      const payment = account.makePayment(additionalPayment);
      expect(payment.balanceEnd).toEqual(balanceEnd);
    });

    it('should throw an error if accrued interest > min payment', () => {
      account = new Account({
        name: 'Credit Card',
        interest: 29.99,
        balance: 1000,
        minPayment: 5,
      });
      expect(() => {
        account.makePayment(0);
      }).toThrow();
    });
  });
});
