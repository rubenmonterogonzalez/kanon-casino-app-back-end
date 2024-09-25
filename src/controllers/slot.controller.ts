import { prisma } from '../utils/prisma';
import { spinReels, calculateWinnings } from '../services/slotMachineService';
import { Request, Response } from 'express';

export const spinSlotMachine = async (req: Request, res: Response) => {
  try {
    const { id } = req.user || {};
    
    // Convert id to number if it's a string
    const userId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    if (!userId) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const { coins } = req.body;

    // Check if the user has enough coins
    if (coins <= 0) {
      return res.status(400).json({ message: 'Insufficient coins' });
    }

    // Deduct one coin for the spin
    let newCoins = coins - 1;

    // Calculate the winnings (replace this with your actual logic)
    const spinResult = spinReels(); // Your spin logic here
    const winAmount = calculateWinnings(spinResult); // Your winning calculation logic here
    newCoins += winAmount;

    // Update the user's coins in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId }, // Ensure `id` is a number
      data: { coins: newCoins },
    });

    return res.json({ spinResult, winAmount, coins: updatedUser.coins });
  } catch (err) {
    console.error('Error during spin:', err);
    return res.status(500).json({ message: 'Internal server error', details: err.message });
  }
};

