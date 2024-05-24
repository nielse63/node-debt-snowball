import { ERROR_MESSAGES } from './constants';
import { toCurrency } from './helpers';
import type { PaymentOptions } from './types';

class Payment {
  private _balance: number;
  interestRate: number;
  payment: number;

  constructor(options: PaymentOptions) {
    if (!options.balance || !options.interest || !options.payment) {
      throw new Error(ERROR_MESSAGES.PAYMENT_OPTIONS_ERROR);
    }
    this._balance = options.balance;
    this.interestRate = options.interest;
    this.payment = options.payment;
  }

  get interest(): number {
    // (Total Amount Owed X Interest Rate) / 12 = Monthly Interest You Pay
    const interestRate = this.interestRate / 100;
    const monthlyAccruedInterest = (this._balance * interestRate) / 12;
    return toCurrency(monthlyAccruedInterest);
  }

  get balance(): number {
    let endPeriodBalance = this._balance - this.payment + this.interest;
    if (endPeriodBalance <= 0) {
      endPeriodBalance = 0;
    }
    return toCurrency(endPeriodBalance);
  }
}

export = Payment;
