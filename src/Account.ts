import { toCurrency } from './helpers';

export type Config = {
  name: string;
  balance: number;
  interest: number;
  minPayment: number;
};

class Account {
  name: string;
  balance: number;
  interest: number;
  minPayment: number;
  payments = [];

  startingBalance = 0;

  constructor(config: Config) {
    const { name, balance, interest, minPayment } = config;

    this.name = name;
    this.balance = balance;
    this.interest = interest;
    this.minPayment = minPayment;

    // calculated values
    this.startingBalance = balance;
  }

  calculateMonthlyInterest() {
    // (Total Amount Owed X Interest Rate) / 12 = Monthly Interest You Pay
    const interestRate = this.interest / 100;
    const monthlyAccruedInterest = (this.balance * interestRate) / 12;
    return toCurrency(monthlyAccruedInterest);
  }

  makePayment(additionalPayment = 0) {
    const startingBalance = this.balance;
    const accruedInterest = this.calculateMonthlyInterest();
    let endingBalance = toCurrency(startingBalance + accruedInterest);
    let initialPaymentAmount = this.minPayment + additionalPayment;
    if (endingBalance - initialPaymentAmount <= 0) {
      initialPaymentAmount = endingBalance;
    }
    const paymentAmount = toCurrency(initialPaymentAmount);
    endingBalance -= paymentAmount;

    // set new class values
    this.balance = toCurrency(endingBalance);

    return {
      startingBalance,
      endingBalance: this.balance,
      paymentAmount,
      accruedInterest,
      additionalPayment,
    };
  }
}

export default Account;
