import Account from './Account';
import Snowball from './Snowball';

const debtSnowball = (accounts: Account[], additionalPayment = 0) => {
  const snowball = new Snowball(accounts, additionalPayment);
  return snowball.createPaymentPlan();
};

export { Snowball, Account };
export default debtSnowball;
