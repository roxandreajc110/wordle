import express, { Application } from 'express';
import userRoutes from '../routes/wordle.route';
import db from '../db/connection';


class Server {

    private app: Application;
    private port: string;
    private apis = {
        wordle: '/api/game/wordle'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Listening port... ' + this.port);
        })
    }

    routes() {
        this.app.use(this.apis.wordle, userRoutes)
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Successful database connection!');
        } catch (err) {
            throw new Error("Failed connection to database!");
        }
    }
    
    middlewares() {
        this.app.use(express.json());
    }
}

export default Server;