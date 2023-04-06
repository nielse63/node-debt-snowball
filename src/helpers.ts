export const toCurrency = (value: string | number) => {
  return Number(parseFloat(`${value}`).toFixed(2));
};
