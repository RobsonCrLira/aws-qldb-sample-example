import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

class Database {
    public connection!: Sequelize.Sequelize;

    constructor() {
        this.init();
    }

    init(): void {
        this.connection = new Sequelize.Sequelize({
            database: databaseConfig.database,
            username: databaseConfig.username,
            password: databaseConfig.password,
            dialect: 'postgres',
            host: databaseConfig.host,
            logging: false,
            define: {
                createdAt: 'created_at',
                updatedAt: 'updated_at',
            },
        });
    }
}

const database: Database = new Database();

export default database;
