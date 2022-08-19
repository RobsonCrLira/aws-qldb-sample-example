import { UserRepository } from '../../repositories/UserRepository';
import { Hasher } from '../../shared/interfaces/protocols/encrypter/hasher';
import { ICreateUser } from '../../shared/interfaces/useCases/User/CreateUser';

export class CreateUserService implements ICreateUser {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hash: Hasher,
    ) {}

    async create(user: {
        email: string;
        password: string;
        full_name: string;
    }): Promise<void> {
        const password_hash = await this.hash.hash(user.password);

        await this.userRepository.create({
            email: user.email,
            password_hash,
            full_name: user.full_name,
        });
    }
}
