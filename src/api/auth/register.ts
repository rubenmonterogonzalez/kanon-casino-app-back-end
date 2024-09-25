import { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../../../kanon/back-end/src/utils/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function register(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { email, password, confirmPassword, username } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res.status(201).json({ token, user: { id: newUser.id, email: newUser.email } });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
