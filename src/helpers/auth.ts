import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    throw new Error('Password hashing failed');
  }
};

export const comparePassword = async (plainPassword: string, hashedPassword: string) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (err) {
    throw new Error('Password comparison failed');
  }
};