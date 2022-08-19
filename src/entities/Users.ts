import Sequelize, { Model } from 'sequelize';
import * as crypto from 'crypto';
import database from '../database';

class User extends Model {
    id!: string;

    full_name!: string;

    email!: string;

    password!: string;

    password_hash!: string;

    readonly createdAt!: Date;

    readonly updatedAt!: Date;
}

User.init(
    {
        full_name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        created_at: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    },
    {
        sequelize: database.connection,
        tableName: 'users',
    },
);

User.addHook('beforeSave', async (user: User) => {
    if (!user.id) {
        user.id = crypto.randomUUID();
    }
});

export { User };
