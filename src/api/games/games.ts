import { VercelRequest, VercelResponse } from '@vercel/node';
import gameData from '../../../../kanon/back-end/src/data/game-data.json';

export default function getGames(req: VercelRequest, res: VercelResponse) {
  try {
    if (!gameData) {
      throw new Error('Game data not found');
    }
    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}