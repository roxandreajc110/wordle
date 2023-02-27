import { DataTypes } from 'sequelize';
import db from '../db/connection';

const GameTrace = db.define('GameTrace', {
    idGame: {
        type: DataTypes.STRING
    },
    word: {
        type: DataTypes.STRING
    },
    resultDetail: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
},
    {
        schema: 'public',
        freezeTableName: true,
        tableName: 'game_traces'
    });


export default GameTrace;