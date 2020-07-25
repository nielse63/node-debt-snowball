import addMonths from 'date-fns/addMonths';

export default class Payment {
  amount = 0;

  index = 0;

  date = new Date();

  constructor({ amount, index }) {
    this.amount = amount;
    this.index = index;
    this.date = this.calculateDate();
  }

  calculateDate() {
    return addMonths(new Date(), this.index + 1);
  }
}
