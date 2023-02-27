import { Sequelize } from 'sequelize';

const db = new Sequelize('wordle', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
    // logging: false,
});

export default db;

