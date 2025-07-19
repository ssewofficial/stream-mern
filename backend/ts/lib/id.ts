export const generateRandomNumber = (numDigits: number): number => {
  const min = Math.pow(10, numDigits - 1);
  const max = Math.pow(10, numDigits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const verifyId = (number: number, digits: number): boolean => {
  return number.toLocaleString().length === digits;
};
