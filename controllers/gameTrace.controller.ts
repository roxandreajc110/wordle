import sequelize from "sequelize";
import GameTrace from "../models/gameTrace.model";


export const createGameTrace = async (gameTrace: {}) => {
    await GameTrace.create(gameTrace);
}

export const getAttemptNumber = async (id: string) => {
    const result = await GameTrace.findAll({
        attributes: [
            [sequelize.fn('COUNT', sequelize.col('id')), 'cont'],
        ],
        where: {
            "idGame": id
        }
    });
    return result[0].dataValues.cont;
}