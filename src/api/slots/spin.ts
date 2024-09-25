import { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../../../kanon/back-end/src/utils/prisma';
import jwt from 'jsonwebtoken';
import { spinReels, calculateWinnings } from '../../../../kanon/back-end/src/services/slotMachineService';

export default async function spinSlotMachine(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.coins <= 0) {
      return res.status(400).json({ error: 'Insufficient coins' });
    }

    const spinResult = spinReels();
    let newCoins = user.coins - 1; // Deduct cost of spin
    const winAmount = calculateWinnings(spinResult);
    newCoins += winAmount; // Add winnings

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { coins: newCoins },
    });

    return res.json({ spinResult, winAmount, coins: updatedUser.coins });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}
