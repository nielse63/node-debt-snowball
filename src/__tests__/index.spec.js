import snowball from '..';
import accounts from '../__mocks__/accounts.mock';

const additionalPayment = 100;

describe('snowball', () => {
  const results = snowball(accounts, additionalPayment);

  it('should be a function', () => {
    expect(snowball).toBeFunction();
  });

  it('should return an object with expected keys and data types', () => {
    expect(results).toBeObject();
    expect(results).toContainKeys(['payoffDate', 'payments']);
    expect(results.payoffDate).toBeValidDate();
    expect(results.payments).toBeArray();
  });

  it('results.payments[0] should match expected shape', () => {
    const object = results.payments[0];
    expect(object).toBeObject();
    expect(object).toContainKeys(['date', 'totalBalance', 'accounts']);
    expect(object.date).toBeValidDate();
    expect(object.totalBalance).toBeNumber();
    expect(object.accounts).toBeArray();
  });

  it('esults.payments[0].accounts[0] should match expected shape', () => {
    const object = results.payments[0].accounts[0];
    expect(object).toBeObject();
    expect(object).toContainKeys(['name', 'payment', 'balance']);
    expect(object.name).toBeString();
    expect(object.payment).toBeNumber();
    expect(object.balance).toBeNumber();
  });
});
