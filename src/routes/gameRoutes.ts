import { Request, Response, NextFunction, Router } from 'express';
import gameData from '../data/game-data.json';

const router = Router();

router.get('/games', (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!gameData) {
      throw new Error('Game data not found');
    }
    res.json(gameData);
  } catch (err) {
    next(err);
  }
});

export default router;