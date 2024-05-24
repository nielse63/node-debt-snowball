import { toCurrency } from './helpers';
import type { PaymentPlanObject, ResultsObject } from './types';

class Results implements ResultsObject {
  totalInterestPaid = 0;
  totalPayments = 0;
  strategy = '';
  payments: PaymentPlanObject[] = [];

  constructor(data: PaymentPlanObject[], strategy: string) {
    this.payments = [...data];
    this.totalInterestPaid = this.calculateTotalInterestPaid();
    this.totalPayments = data.length;
    this.strategy = strategy;
  }

  calculateTotalInterestPaid() {
    const value = this.payments.reduce((acc: number, item) => {
      const monthlyInterest = item.accounts.reduce((output, account) => {
        return output + account.accruedInterest;
      }, 0);
      return acc + monthlyInterest;
    }, 0);
    return toCurrency(value);
  }
}

export = Results;
