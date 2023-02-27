"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGameAttempt = exports.startGame = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const game_controller_1 = require("./game.controller");
const gameTrace_controller_1 = require("./gameTrace.controller");
const wordDictionay_controller_1 = require("./wordDictionay.controller");
const appConstants_1 = require("../utils/appConstants");
const customResponse_1 = require("../utils/customResponse");
const resultWord_1 = require("../utils/resultWord");
const startGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const randomWord = yield getRandomWordByGame(req.body.userId);
        const result = yield (0, game_controller_1.createGame)({
            userId: req.body.userId,
            word: randomWord,
            status: appConstants_1.GAME_STATES.STARTED
        });
        res.json(new customResponse_1.CustomResponse("Game started!", {
            id: result.id,
            status: result.status,
            createdAt: result.createdAt
        }));
    }
    catch (err) {
        res.status(500).json(new customResponse_1.CustomResponse("Problems configuring the game!"));
    }
});
exports.startGame = startGame;
const validateGameAttempt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idGame = req.params.id;
    const body = req.body;
    const infoGame = yield (0, game_controller_1.getValidGame)(idGame);
    if (infoGame) {
        const [attemptNumber, resExistWord] = yield Promise.all([(0, gameTrace_controller_1.getAttemptNumber)(idGame), (0, wordDictionay_controller_1.existWord)(body.word)]);
        if (!resExistWord) {
            return res.status(400).json(new customResponse_1.CustomResponse("The word doesn't exist in the dictionary!"));
        }
        if (attemptNumber < appConstants_1.MAX_ATTEMPTS) {
            let { result, validations } = validateWord(infoGame.word, body.word);
            const resultAttempt = (result === 1 ? "WIN" : "LOSE");
            let statusGame = infoGame.status;
            let messageFinal = "Keep trying!!";
            let actions = [(0, gameTrace_controller_1.createGameTrace)({
                    idGame: idGame,
                    word: body.word,
                    resultDetail: JSON.stringify(validations),
                    status: resultAttempt
                })];
            if (result === 1 || attemptNumber == appConstants_1.MAX_ATTEMPTS - 1) {
                statusGame = appConstants_1.GAME_STATES.FINISHED;
                messageFinal = "Game over!!";
                actions.push((0, game_controller_1.updateGameById)(idGame, { status: statusGame, result: resultAttempt }));
            }
            yield Promise.all([actions]);
            return res.json(new customResponse_1.CustomResponse(messageFinal, new resultWord_1.ResponseResultWord(body.word, validations)));
        }
        else {
            return res.json(new customResponse_1.CustomResponse("The game has already been finished!"));
        }
    }
    else {
        return res.status(400).json(new customResponse_1.CustomResponse("Game doesn't exist o has already been finished!"));
    }
});
exports.validateGameAttempt = validateGameAttempt;
const validateWord = (wordOriginal, wordAttempt) => {
    const wordOriginalArray = wordOriginal.split('');
    let validations = [];
    let score;
    wordAttempt.toUpperCase().split('').forEach(function (letter, index) {
        const numberOcurrences = wordOriginalArray.filter(l => l === letter).length;
        const count = validations.filter(v => v.getLetter === letter).length;
        if (letter === wordOriginalArray[index]) {
            score = 1;
        }
        else if (wordOriginalArray.includes(letter) && (count < numberOcurrences)) {
            score = 2;
        }
        else {
            score = 3;
        }
        validations.push(new resultWord_1.ResultWord(letter, score));
    });
    return {
        result: (wordOriginal === wordAttempt ? 1 : 0),
        validations
    };
};
const getRandomWordByGame = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.default.query(`SELECT word FROM words_dictionary where word NOT IN (SELECT DISTINCT(word) FROM games WHERE "userId"=?) ORDER BY RANDOM() LIMIT 1`, {
        replacements: [userId],
        type: sequelize_1.QueryTypes.SELECT
    });
    if (result.length > 0) {
        return result[0].word;
    }
    else {
        throw "No new words found!";
    }
});
//# sourceMappingURL=wordle.controller.js.map