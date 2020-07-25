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
    const date = addMonths(new Date(), this.index + 1);
    return date;
  }

  toJSON() {
    return {
      amount: this.amount,
      index: this.index,
      date: this.date,
    };
  }
}
