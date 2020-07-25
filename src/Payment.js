import addMonths from 'date-fns/addMonths';

export default class Payment {
  amount = 0;

  index = 0;

  remainingBalance = 0;

  date = new Date();

  constructor({ amount, index, remainingBalance }) {
    this.amount = amount;
    this.index = index;
    this.remainingBalance = remainingBalance;
    this.date = this.calculateDate();
  }

  calculateDate() {
    const date = addMonths(new Date(), this.index);
    return date;
  }

  toJSON() {
    return {
      amount: this.amount,
      index: this.index,
      remainingBalance: this.remainingBalance,
      date: this.date,
    };
  }
}
