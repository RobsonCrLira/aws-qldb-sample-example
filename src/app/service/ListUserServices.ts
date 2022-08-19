import { IListUser } from '../../shared/interfaces/useCases/User/ListUser';
import { UserRepository } from '../../repositories/UserRepository';
import { UserDTO } from '../../shared/interfaces/DTOs/UsersDTO';

export class ListUserService implements IListUser {
    constructor(private readonly userRepository: UserRepository) {}

    async list(): Promise<UserDTO[]> {
        const list = await this.userRepository.list();
        return list;
    }
}
