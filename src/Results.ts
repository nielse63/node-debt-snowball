import { toCurrency } from './helpers';
import type { PaymentPlanObject, ResultsObject } from './types.d';

class Results implements ResultsObject {
  totalInterestPaid = 0;
  totalPayments = 0;
  payments: PaymentPlanObject[] = [];

  constructor(data: PaymentPlanObject[]) {
    this.payments = [...data];
    this.totalInterestPaid = this.calculateTotalInterestPaid();
    this.totalPayments = data.length;
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

export default Results;
