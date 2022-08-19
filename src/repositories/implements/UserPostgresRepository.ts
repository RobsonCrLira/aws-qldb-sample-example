import { Op } from 'sequelize';
import { User } from '../../entities/Users';
import { UserModel } from '../../shared/interfaces/DTOs/UsersDTO';
import { LogUser } from '../../shared/interfaces/logs/logUser';
import { UserCreate, UserRepository } from '../UserRepository';

export class UserPostgresRepository implements UserRepository {
    constructor(private readonly qldbUser: LogUser) {}

    async findById(user_id: string): Promise<UserModel | null> {
        const user = await User.findByPk(user_id);
        return user;
    }

    async create(data: UserCreate): Promise<void> {
        const user = await User.create({ ...data });
        const dataUser: UserModel = {
            email: user.email,
            full_name: user.full_name,
            id: user.id,
            password_hash: user.password_hash,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
        };
        await this.qldbUser.query({ data: dataUser, method: 'ínsert' });
    }

    async update({ id, ...data }: UserModel): Promise<void> {
        await User.update({ ...data }, { where: { id } });
        await this.qldbUser.query({ data: { ...data, id }, method: 'update' });
    }

    async delete(user_id: string): Promise<void> {
        const user = await this.findById(user_id);
        if (user) {
            const dataUser: UserModel = {
                email: user.email,
                full_name: user.full_name,
                id: user.id,
                password_hash: user.password_hash,
            };

            await this.qldbUser.query({ data: dataUser, method: 'delete' });
        }
        await User.destroy({ where: { id: user_id } });
    }

    async list(): Promise<UserModel[]> {
        const users = await User.findAll({});

        return users.map((user: UserModel) => {
            return {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                updated_at: user.updated_at,
                password_hash: '',
            };
        });
    }

    async show(user_id: string): Promise<UserModel | null> {
        const user = await User.findByPk(user_id);
        return user;
    }

    async findByEmail(email: string): Promise<UserModel | null> {
        const user = await User.findOne({
            where: { email: { [Op.like]: email } },
        });
        return user;
    }
}
