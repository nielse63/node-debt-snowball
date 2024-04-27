import Payment from '../Payment';

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
