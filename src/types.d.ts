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

export interface PaymentObject {
  startingBalance: number;
  endingBalance: number;
  accruedInterest: number;
  additionalPayment: number;
  paymentAmount: number;
}
