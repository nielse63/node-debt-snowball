export type AccountConfig = {
  name: string;
  balance: number;
  interest: number;
  minPayment: number;
};

export interface IPayment {
  startingBalance: number;
  endingBalance: number;
  accruedInterest: number;
  additionalPayment: number;
  paymentAmount: number;
}
