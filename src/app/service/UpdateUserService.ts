import { IUpdateUser } from '../../shared/interfaces/useCases/User/UpdateUser';
import { UserRepository } from '../../repositories/UserRepository';
import { Hasher } from '../../shared/interfaces/protocols/encrypter/hasher';
import { UserDTO } from '../../shared/interfaces/DTOs/UsersDTO';
import { NotFoundError } from '../../shared/errors/notFoundError';

export class UpdateUserService implements IUpdateUser {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hash: Hasher,
    ) {}

    async update(data: UserDTO): Promise<any | null> {
        const user = await this.userRepository.findById(data.id);
        if (user) {
            let password_hash = null;
            if (data.password)
                password_hash = await this.hash.hash(data.password);

            await this.userRepository.update({
                email: data.email,
                password_hash: password_hash || user.password_hash,
                full_name: data.full_name,
                id: data.id,
            });
            return null;
        }
        return new NotFoundError(`User ${data.id} not found`);
    }
}
