import DebtSnowball from './DebtSnowball';

export default (accounts, additionalPayment) => {
  const snowball = new DebtSnowball(accounts, additionalPayment);

  return {
    accounts: snowball.accounts,
    additionalPayment: snowball.additionalPayment,
    simulate: snowball.simulate,
  };
};
