"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statistics_controller_1 = require("../controllers/statistics.controller");
const wordle_controller_1 = require("../controllers/wordle.controller");
const validateRequest_1 = require("../utils/validation/validateRequest");
const validationSchemas_1 = require("../utils/validation/validationSchemas");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.validateRequest)(validationSchemas_1.startGameSchema), wordle_controller_1.startGame);
router.post('/:id/attempt', (0, validateRequest_1.validateRequest)(validationSchemas_1.gameAttemptSchema), wordle_controller_1.validateGameAttempt);
router.get('/summary', (0, validateRequest_1.validateRequest)(validationSchemas_1.gameSummaryByUserIdSchema), statistics_controller_1.getGameSummaryByUser);
router.get('/summary/players/top/:topNumber', (0, validateRequest_1.validateRequest)(validationSchemas_1.gameSummaryTop), statistics_controller_1.getSummaryTopPlayers);
router.get('/summary/words/top/:topNumber', (0, validateRequest_1.validateRequest)(validationSchemas_1.gameSummaryTop), statistics_controller_1.getSummaryTopWords);
exports.default = router;
//# sourceMappingURL=wordle.route.js.map