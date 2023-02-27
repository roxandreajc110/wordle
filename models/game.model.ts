import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Game = db.define('Game', {
    userId: {
        type: DataTypes.INTEGER
    },
    word: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    result: {
        type: DataTypes.STRING
    },
},
    {
        schema: 'public',
        freezeTableName: true,
        tableName: 'games'
    });


export default Game;