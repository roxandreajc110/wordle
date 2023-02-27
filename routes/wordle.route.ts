import { Router } from 'express';
import { getGameSummaryByUser, getSummaryTopPlayers, getSummaryTopWords } from '../controllers/statistics.controller';
import { startGame, validateGameAttempt } from '../controllers/wordle.controller';
import { validateRequest } from '../utils/validation/validateRequest';
import { gameAttemptSchema, gameSummaryByUserIdSchema, gameSummaryTop, startGameSchema } from '../utils/validation/validationSchemas';


const router = Router();
router.post('/', validateRequest(startGameSchema), startGame);
router.post('/:id/attempt', validateRequest(gameAttemptSchema), validateGameAttempt);
router.get('/summary', validateRequest(gameSummaryByUserIdSchema), getGameSummaryByUser);
router.get('/summary/players/top/:topNumber', validateRequest(gameSummaryTop), getSummaryTopPlayers);
router.get('/summary/words/top/:topNumber', validateRequest(gameSummaryTop), getSummaryTopWords);


export default router;