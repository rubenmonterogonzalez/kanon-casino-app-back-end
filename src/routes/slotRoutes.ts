import express from 'express';
import { spinSlotMachine } from '../controllers/slot.controller';
import { playerCoins } from '../controllers/player.controller';
import { requireSignin } from '../middleware';

const router = express.Router();

router.post('/spin', requireSignin, spinSlotMachine);
router.get('/coins', requireSignin, playerCoins)

export default router;