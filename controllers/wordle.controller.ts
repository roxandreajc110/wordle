import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import db from '../db/connection';
import { createGame, getValidGame, updateGameById } from './game.controller';
import { createGameTrace, getAttemptNumber } from './gameTrace.controller';
import { existWord } from './wordDictionay.controller';
import { GAME_STATES, MAX_ATTEMPTS } from '../utils/appConstants';
import { CustomResponse } from '../utils/customResponse';
import { ResponseResultWord, ResultWord } from '../utils/resultWord';


export const startGame = async (req: Request, res: Response) => {
    try {
        const randomWord = await getRandomWordByGame(req.body.userId);
        const result = await createGame({
            userId: req.body.userId,
            word: randomWord,
            status: GAME_STATES.STARTED
        });
        res.json(new CustomResponse("Game started!", {
            id: result.id,
            status: result.status,
            createdAt: result.createdAt
        }));
    } catch (err) {
        res.status(500).json(new CustomResponse("Problems configuring the game!"));
    }
}

export const validateGameAttempt = async (req: Request, res: Response) => {
    const idGame = req.params.id;
    const body = req.body;
    const infoGame = await getValidGame(idGame);
    if (infoGame) {
        const [attemptNumber, resExistWord] = await Promise.all([getAttemptNumber(idGame), existWord(body.word)]);
        if (!resExistWord) {
            return res.status(400).json(new CustomResponse("The word doesn't exist in the dictionary!"));
        }
        if (attemptNumber < MAX_ATTEMPTS) {
            let { result, validations } = validateWord(infoGame.word, body.word);
            const resultAttempt = (result === 1 ? "WIN" : "LOSE");
            let statusGame = infoGame.status;
            let messageFinal = "Keep trying!!";
            let actions = [createGameTrace({
                idGame: idGame,
                word: body.word,
                resultDetail: JSON.stringify(validations),
                status: resultAttempt
            })];
            if (result === 1 || attemptNumber == MAX_ATTEMPTS - 1) {
                statusGame = GAME_STATES.FINISHED
                messageFinal = "Game over!!";
                actions.push(updateGameById(idGame, { status: statusGame, result: resultAttempt }));
            }
            await Promise.all([actions]);
            return res.json(new CustomResponse(messageFinal, new ResponseResultWord(body.word, validations)));
        } else {
            return res.json(new CustomResponse("The game has already been finished!"));
        }
    } else {
        return res.status(400).json(new CustomResponse("Game doesn't exist o has already been finished!"));
    }
}

const validateWord = (wordOriginal: string, wordAttempt: string) => {
    const wordOriginalArray = wordOriginal.split('');
    let validations: ResultWord[] = [];
    let score;
    wordAttempt.toUpperCase().split('').forEach(function (letter, index) {
        const numberOcurrences = wordOriginalArray.filter(l => l === letter).length;
        const count = validations.filter(v => v.getLetter === letter).length;
        if (letter === wordOriginalArray[index]) {
            score = 1;
        } else if (wordOriginalArray.includes(letter) && (count < numberOcurrences)) {
            score = 2;
        } else {
            score = 3;
        }
        validations.push(new ResultWord(letter, score));
    });
    return {
        result: (wordOriginal === wordAttempt ? 1 : 0),
        validations
    };
}

const getRandomWordByGame = async (userId: number) => {
    const result: { word: string; }[] = await db.query(`SELECT word FROM words_dictionary where word NOT IN (SELECT DISTINCT(word) FROM games WHERE "userId"=?) ORDER BY RANDOM() LIMIT 1`,
        {
            replacements: [userId],
            type: QueryTypes.SELECT
        });
    if (result.length > 0) {
        return result[0].word;
    } else {
        throw "No new words found!";
    }
}