import { Request, Response } from 'express';
import { prisma } from "../utils/prisma";

export const playerCoins = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // Cast req to any to access user

    if (!userId) {
      return res.status(400).json({ message: 'User ID not provided' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ coins: user.coins });
  } catch (err) {
    console.error('Error fetching coins:', err);
    return res.status(500).json({ message: 'Internal server error', details: err.message });
  }
};