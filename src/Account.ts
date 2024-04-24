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
  }

  calculateMonthlyInterest() {
    // (Total Amount Owed X Interest Rate) / 12 = Monthly Interest You Pay
    const interestRate = this.interest / 100;
    const monthlyAccruedInterest = (this.balance * interestRate) / 12;
    return toCurrency(monthlyAccruedInterest);
  }

  makePayment(additionalPayment = 0): PaymentObject {
    // account balance before interest or payment is applied
    const startingBalance = this.balance;
    const accruedInterest = this.calculateMonthlyInterest();
    let endPeriodBalance = toCurrency(startingBalance + accruedInterest);
    let initialPaymentAmount = this.minPayment + additionalPayment;
    if (endPeriodBalance - initialPaymentAmount <= 0) {
      initialPaymentAmount = endPeriodBalance;
    }
    const paymentAmount = toCurrency(initialPaymentAmount);
    endPeriodBalance -= paymentAmount;

    // set new balance values
    const endingBalance = toCurrency(endPeriodBalance);
    this.balance = endingBalance;

    return {
      startingBalance,
      endingBalance,
      accruedInterest,
      additionalPayment,
      paymentAmount,
    };
  }
}

export default Account;
