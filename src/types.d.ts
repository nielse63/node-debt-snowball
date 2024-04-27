export interface AccountObject {
  name: string;
  balance: number;
  interest: number;
  minPayment: number;
}

export type Payment = {
  balance: number;
  accounts: Account[];
};

export interface PaymentOptions {
  balance: number;
  interest: number;
  payment: number;
}

export interface PaymentObject {
  balanceStart: number;
  balanceEnd: number;
  // interestRate: number;
  accruedInterest: number;
  additionalPayment: number;
  paymentAmount: number;
  minPayment: number;
}

export interface PaymentPlanObject {
  balance: number;
  accounts: PaymentObject[];
}

export interface ResultsObject {
  totalInterestPaid: number;
  totalPayments: number;
  payments: Array<PaymentPlanObject>;
}
