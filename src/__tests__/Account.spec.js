import Account from '../Account';

const options = {
  name: 'test',
  principal: 1000,
  interest: 10.0,
  minPayment: 50,
  additionalPayment: 25,
};

describe('Account', () => {
  it('should be defined', () => {
    expect(Account).toBeDefined();
  });

  it('should set property values from constructor argument', () => {
    const account = new Account(options);
    Object.entries(options).forEach(([key, value]) => {
      expect(account[key]).toEqual(value);
    });
  });
});
