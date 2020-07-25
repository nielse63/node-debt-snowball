import DebtSnowball from '../DebtSnowball';

const accounts = [
  {
    name: 'account 1',
    principal: 1000,
    interest: 10.0,
    minPayment: 50,
  },
  {
    name: 'account 2',
    principal: 500,
    interest: 25.5,
    minPayment: 100,
  },
  {
    name: 'account 3',
    principal: 5000,
    interest: 15,
    minPayment: 100,
  },
  {
    name: 'account 4',
    principal: 1000,
    interest: 15,
    minPayment: 100,
  },
];

const options = {
  accounts,
  additionalPayment: 100,
};

describe('DebtSnowball', () => {
  it('should be defined', () => {
    expect(DebtSnowball).toBeDefined();
  });

  describe('properties', () => {
    it('should have expected properties', () => {
      const snowball = new DebtSnowball(options);
      ['accounts'].forEach((key) => {
        expect(snowball[key]).toBeDefined();
      });
    });
  });

  describe('constructor', () => {
    it('should handle empty args', () => {
      const snowball = new DebtSnowball({});
      expect(snowball.accounts).toEqual([]);
    });

    it('should set accounts array on init', () => {
      const snowball = new DebtSnowball(options);
      expect(snowball.accounts.length).toEqual(accounts.length);
    });
  });

  describe('methods', () => {
    let snowball;
    beforeEach(() => {
      snowball = new DebtSnowball(options);
    });

    describe.skip('run', () => {
      it('should run', () => {
        const results = snowball.run();
        console.log(results);
        expect(true).toBe(true);
      });
    });
  });
});
