import Payment from '../Payment';
import { ERROR_MESSAGES } from '../constants';

const MOCK_ACCOUNT = {
  interest: 14.99,
  balance: 1000,
  payment: 175,
};

const getMonthlyInterest = (object) => {
  const interest = object.interest / 100;
  return Number(((object.balance * interest) / 12).toFixed(2));
};

describe('Payment', () => {
  let payment;

  beforeEach(() => {
    payment = new Payment({ ...MOCK_ACCOUNT });
  });

  describe('constructor', () => {
    it('should create a new instance of Payment', () => {
      expect(payment).toBeInstanceOf(Payment);
    });

    it('should set the account properties', () => {
      expect(payment.interestRate).toEqual(14.99);
      expect(payment.balance).toEqual(837.49);
      expect(payment.payment).toEqual(175);
    });

    it('should throw an error if balance, interest or payment are falsey', () => {
      expect(() => {
        new Payment({ balance: 0, interest: 0, payment: 0 });
      }).toThrow(ERROR_MESSAGES.PAYMENT_OPTIONS_ERROR);
      expect(() => {
        new Payment({ balance: 100, interest: 0, payment: 0 });
      }).toThrow(ERROR_MESSAGES.PAYMENT_OPTIONS_ERROR);
      expect(() => {
        new Payment({ balance: 100, interest: 10, payment: 0 });
      }).toThrow(ERROR_MESSAGES.PAYMENT_OPTIONS_ERROR);
    });
  });

  describe('interest', () => {
    it('should return monthly interest rate accurately', () => {
      const expected = getMonthlyInterest(MOCK_ACCOUNT);
      expect(payment.interest).toEqual(expected);
    });
  });

  describe('balance', () => {
    it('should get the balance', () => {
      expect(payment.balance).toEqual(837.49);
    });
  });
});
