import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma';

export const requireSignin = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number }; // Adjust based on your token payload

    // Fetch the user from the database
    const user = await prisma.user.findUnique({ where: { id: decoded.id } }); // Adjust this line if your user ID field has a different name

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    (req as any).user = user; // Attach user to req with a type cast

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};