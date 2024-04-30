import Payment from './Payment';
import { ERROR_MESSAGES } from './constants';
import { toCurrency } from './helpers';
import type { AccountObject, PaymentObject } from './types.d';

class Account {
  name: string;
  balance: number;
  interest: number;
  minPayment: number;
  private _originalBalance: number;

  constructor(config: AccountObject) {
    const { name, balance, interest, minPayment } = config;

    this.name = name;
    this.balance = balance;
    this._originalBalance = balance;
    this.interest = interest;
    this.minPayment = minPayment;

    if (this.balance <= 0) {
      throw new Error(ERROR_MESSAGES.BALANCE_ERROR);
    }
    if (this.interest <= 0) {
      throw new Error(ERROR_MESSAGES.INTEREST_RATE_ERROR);
    }
    if (this.minPayment <= 0) {
      throw new Error(ERROR_MESSAGES.MIN_PAYMENT_ERROR);
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

    // throw error if accrued interest is greater than the minimum payment
    if (accruedInterest >= this.minPayment) {
      throw new Error(ERROR_MESSAGES.MIN_PAYMENT_NOT_ENOUGH);
    }

    const originalBalance = this.balance;
    this.balance = payment.balance;
    const paymentAmount = this.balance <= 0 ? originalBalance : payment.payment;

    return {
      balanceStart: toCurrency(originalBalance),
      balanceEnd: toCurrency(this.balance),
      accruedInterest,
      minPayment: toCurrency(this.minPayment),
      additionalPayment,
      paymentAmount,
    };
  }
}

export default Account;
