import get from 'lodash/get';

export default class Account {
  static defaultValues = {
    name: {
      defaultValue: '',
      type: Number,
      required: true,
    },
    principal: {
      defaultValue: 0,
      type: Number,
      required: true,
    },
    interest: {
      defaultValue: 0,
      type: Number,
      required: true,
    },
    minPayment: {
      defaultValue: 0,
      type: Number,
      required: true,
    },
    additionalPayment: {
      defaultValue: 0,
      type: Number,
      required: true,
    },
  };

  constructor(options = {}) {
    this.setAccountProperties(options);
  }

  setAccountProperties(options = {}) {
    Object.entries(Account.defaultValues).forEach(([key, { defaultValue }]) => {
      const value = get(options, key, defaultValue);
      this[key] = value;
    });
  }
}
