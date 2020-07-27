const Account = require('../Account');
const [creditCard] = require('../__mocks__/input.mock');

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

  describe('calculateMonthlyInterest', () => {
    it('should return monthly interest rate accurately', () => {
      const expected = getMonthlyInterest(creditCard);
      const actual = account.calculateMonthlyInterest();
      expect(actual).toEqual(expected);
    });
  });

  describe('makePayment', () => {
    it('should return object with defined shape', () => {
      const payment = account.makePayment(additionalPayment);
      expect(payment).toBeObject();

      expect(payment.startingBalance).toBeNumber();
      expect(payment.startingBalance).toEqual(creditCard.balance);

      expect(payment.endingBalance).toBeNumber();

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
      const endingBalance =
        creditCard.balance +
        interest -
        (creditCard.minPayment + additionalPayment);
      const payment = account.makePayment(additionalPayment);
      expect(payment.endingBalance).toEqual(endingBalance);
    });
  });
});
