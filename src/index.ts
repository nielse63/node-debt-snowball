/**
 * The primary entry point for the node-debt-snowball module.
 * @module node-debt-snowball
 */
import Account from './Account';
import Snowball from './Snowball';

/**
 *
 * @public
 * @param accounts {Account[]} array of Account objects
 * @param additionalPayment {number} additional payment to apply to each account
 * @returns {Payment[]} an array of Payment objects
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
const debtSnowball = (accounts: Account[], additionalPayment = 0) => {
  const snowball = new Snowball(accounts, additionalPayment);
  return snowball.createPaymentPlan();
};

export { Account, Snowball };
export default debtSnowball;
