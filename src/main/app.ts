import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import router from '../router/router';

class App {
    server;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.server.use(cors({ origin: '*' }));
        this.server.use(express.json());
        this.server.use(logger('dev'));
    }

    private routes() {
        this.server.use(router);
    }
}
export default new App().server;
