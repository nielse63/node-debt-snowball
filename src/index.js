import DebtSnowball from './DebtSnowball';

export default (accounts, additionalPayment) => {
  const snowball = new DebtSnowball(accounts, additionalPayment);
  return snowball.simulate();
};
