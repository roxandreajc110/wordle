import { DataTypes } from 'sequelize';
import db from '../db/connection';

const WordDictionary = db.define('WordDictionary', {
    word: {
        type: DataTypes.STRING,
        primaryKey: true
    }
},
    {
        schema: 'public',
        freezeTableName: true,
        tableName: 'words_dictionary'
    });


export default WordDictionary;