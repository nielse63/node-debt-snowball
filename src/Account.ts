import Payment from './Payment';
import { toCurrency } from './helpers';
import { AccountObject, PaymentObject } from './types';

class Account {
  name: string;
  balance: number;
  interest: number;
  minPayment: number;
  originalBalance: number;

  constructor(config: AccountObject) {
    const { name, balance, interest, minPayment } = config;

    this.name = name;
    this.balance = balance;
    this.originalBalance = balance;
    this.interest = interest;
    this.minPayment = minPayment;

    if (this.minPayment <= 0) {
      throw new Error('Minimum payment must be greater than 0');
    }
  }

  makePayment(additionalPayment = 0): PaymentObject {
    if (this.balance <= 0) {
      return {
        balanceStart: this.balance,
        balanceEnd: this.balance,
        accruedInterest: 0,
        minPayment: this.minPayment,
        additionalPayment: 0,
        paymentAmount: 0,
      };
    }

    const payment = new Payment({
      balance: this.balance,
      interest: this.interest,
      payment: this.minPayment + additionalPayment,
    });
    const { interest: accruedInterest } = payment;

    const originalBalance = this.balance;
    this.balance = payment.balance;
    const paymentAmount = this.balance <= 0 ? originalBalance : payment.payment;

    return {
      balanceStart: toCurrency(originalBalance),
      balanceEnd: toCurrency(this.balance),
      accruedInterest,
      minPayment: toCurrency(this.minPayment),
      additionalPayment,
      // paymentAmount: toCurrency(payment.payment),
      paymentAmount,
    };
  }
}

export default Account;
