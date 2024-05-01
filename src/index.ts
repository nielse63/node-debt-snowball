/**
 * The primary entry point for the node-debt-snowball module.
 * @module node-debt-snowball
 */
import Account from './Account';
import Payment from './Payment';
import Results from './Results';
import Snowball from './Snowball';
import type { AccountObject } from './types';

/**
 *
 * @param {AccountObject[]} accounts array of Account objects
 * @param {number} additionalPayment additional payment to apply to each account
 * @returns {Payment[]}
 * @example
 * import snowball from 'node-debt-snowball';

 * const accounts = [
 *   {
 *     name: 'Credit Card',
 *     interest: 14.99,
 *     balance: 1000,
 *     minPayment: 75,
 *   },
 *   {
 *     name: 'Student Loan',
 *     interest: 4.75,
 *     balance: 7500,
 *     minPayment: 150,
 *   },
 * ];
 * const additionalPayment = 100;

 * const repaymentPlan = snowball(accounts, additionalPayment);
 */
const snowball = (accounts: AccountObject[], additionalPayment = 0) => {
  const output = new Snowball(accounts, additionalPayment);
  return output.createPaymentPlan();
};

export type * from './types';
export { Account, Payment, Results, Snowball, snowball };
export default snowball;
