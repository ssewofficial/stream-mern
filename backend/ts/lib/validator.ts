const isFuture = (date: number | string | Date): boolean => {
  return +new Date(date) > Date.now();
};

const isPast = (date: number | string | Date): boolean => {
  return +new Date(date) < Date.now();
};

const isToday = (date: number | string | Date): boolean => {
  const today = new Date();
  const inputDate = new Date(date);
  return (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate()
  );
};

const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isAlphanumeric = (value: string): boolean => {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(value);
};

export default { isEmail, isFuture, isPast, isToday, isAlphanumeric };
