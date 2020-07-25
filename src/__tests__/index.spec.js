import snowball from '..';
import accounts from '../__mocks__/accounts.mock';
// import DebtSnowball from '../DebtSnowball';

const options = {
  accounts,
  additionalPayment: 100,
};

describe('snowball', () => {
  const repaymentPlan = snowball(options);

  it('should be a function', () => {
    expect(snowball).toBeFunction();
  });

  it('should return an object with expected keys', () => {
    expect(repaymentPlan).toBeObject();
    expect(repaymentPlan).toContainKeys([
      'accounts',
      'additionalPayment',
      'simulate',
    ]);
  });

  it('returned object should be expected data types', () => {
    expect(repaymentPlan.accounts).toBeArray();
    expect(repaymentPlan.additionalPayment).toBeNumber();
    expect(repaymentPlan.simulate).toBeFunction();
  });

  it('simulate should return DebtSnowball results', () => {
    expect(repaymentPlan.accounts).toBeArray();
    expect(repaymentPlan.additionalPayment).toBeNumber();
    expect(repaymentPlan.simulate).toBeFunction();
  });
});
