import { Request, Response } from 'express';
import { GAME_RESULTS, GAME_STATES } from "../utils/appConstants";
import { CustomResponse } from "../utils/customResponse";
import { findAllByUserId, getTopPlayers, getTopWords } from "./game.controller";

export const getGameSummaryByUser = async (req: Request, res: Response) => {
    const games: any[] = await findAllByUserId(Number(req.query.userId), { status: GAME_STATES.FINISHED });
      res.json(new CustomResponse("Summary games!", {
          totalGamesPlayed: games.length,
          victories: games.filter((game: { result: string; }) => game.result === GAME_RESULTS.WIN).length,
      }));
}

export const getSummaryTopPlayers = async (req: Request, res: Response) => {
    const topPlayers: any[] = await getTopPlayers(Number(req.params.topNumber));
    res.json(new CustomResponse("Top Summary players!", topPlayers));
}

export const getSummaryTopWords = async (req: Request, res: Response) => {
    const topWords: any[] = await getTopWords(Number(req.params.topNumber));
    res.json(new CustomResponse("Top Summary words!", topWords));
}