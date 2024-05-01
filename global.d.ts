import 'jest-extended';

interface AccountObject {
  name: string;
  balance: number;
  interest: number;
  minPayment: number;
}

type Payment = {
  balance: number;
  accounts: Account[];
};

interface PaymentOptions {
  balance: number;
  interest: number;
  payment: number;
}

interface PaymentObject {
  balanceStart: number;
  balanceEnd: number;
  // interestRate: number;
  accruedInterest: number;
  additionalPayment: number;
  paymentAmount: number;
  minPayment: number;
}

interface PaymentPlanObject {
  balance: number;
  accounts: PaymentObject[];
}

interface ResultsObject {
  totalInterestPaid: number;
  totalPayments: number;
  payments: Array<PaymentPlanObject>;
}
