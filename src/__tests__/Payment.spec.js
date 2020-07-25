import addMonths from 'date-fns/addMonths';
import Payment from '../Payment';

const options = {
  amount: 1000,
  index: 1,
};

describe('Payment', () => {
  const payment = new Payment(options);

  it('should have expected props', () => {
    ['index', 'amount', 'date'].forEach((key) => {
      expect(payment[key]).toBeDefined();
    });
    expect(typeof payment.index).toEqual('number');
    expect(typeof payment.amount).toEqual('number');
    expect(payment.date).toBeInstanceOf(Date);
  });

  it('should calculate date based on index', () => {
    const expected = addMonths(new Date(), options.index + 1);
    const actual = payment.calculateDate();
    expect(actual.toDateString()).toEqual(expected.toDateString());
  });
});
