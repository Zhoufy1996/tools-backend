export const getRandomStr = (digit: number) => {
  const str = 'abcdefghijklmnopqrstuvwxyz1234567890';
  const min = 0;
  const max = str.length - 1;

  let result = '';
  for (let i = 0; i < digit; i += 1) {
    result += str[getRandomInt(min, max)];
  }

  return result;
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
