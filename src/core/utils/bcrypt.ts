import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = (password: string) => {
  const hash = bcrypt.hashSync(password, saltRounds);

  return hash;
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
