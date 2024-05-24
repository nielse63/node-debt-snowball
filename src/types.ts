export interface AccountObject {
  name: string;
  balance: number;
  interest: number;
  minPayment: number;
}

export enum AccountObjectKeys {
  name = 'name',
  balance = 'balance',
  interest = 'interest',
  minPayment = 'minPayment',
}

export enum OrderDirection {
  ascending = 'ascending',
  descending = 'descending',
}

export enum RepaymentStrategy {
  avalance = 'avalance',
  snowball = 'snowball',
}

export type Payment = {
  balance: number;
  accounts: AccountObject[];
};

export interface PaymentOptions {
  balance: number;
  interest: number;
  payment: number;
}

export interface PaymentObject {
  balanceStart: number;
  balanceEnd: number;
  accruedInterest: number;
  additionalPayment: number;
  paymentAmount: number;
  minPayment: number;
  name: string;
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
