import { prisma } from '../utils/prisma';

export const createUser = async (username: string, email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });

  return user;
};