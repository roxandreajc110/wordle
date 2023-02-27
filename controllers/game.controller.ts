import sequelize from "sequelize";
import Game from "../models/game.model"
import { GAME_STATES, GAME_RESULTS } from '../utils/appConstants';

export const createGame = async (game: {}) => {
    const result = await Game.create(game);
    return result.dataValues;
}

export const updateGameById = async (id: string, paramsUpdate: {}) => {
    await Game.update(paramsUpdate, {
        where: { id }
    });
}

export const getValidGame = async (id: string) => {
    const result = await Game.findOne({
        where: {
            id,
            status: GAME_STATES.STARTED
        }
    });
    return result?.dataValues;
}

export const findAllByUserId = async (userId: number, filter?: {}) => {
    return await Game.findAll({
        where: { userId, ...filter }
    });
}

export const getTopPlayers = async (top: number) => {
    return await Game.findAll({
        attributes: [
            "userId",
            [sequelize.fn("COUNT", sequelize.col("id")), "victories"],
        ],
        where: { status: GAME_STATES.FINISHED, result: GAME_RESULTS.WIN },
        group: 'userId',
        order: [['victories', 'DESC']],
        limit: top
    });
}

export const getTopWords = async (top: number) => {
    return await Game.findAll({
        attributes: [
            "word",
            [sequelize.fn("COUNT", sequelize.col("id")), "count"],
        ],
        where: { status: GAME_STATES.FINISHED, result: GAME_RESULTS.WIN },
        group: 'word',
        order: [['count', 'DESC']],
        limit: top
    });
}
