import { IDeleteUser } from '../../shared/interfaces/useCases/User/DeleteUser';
import { UserRepository } from '../../repositories/UserRepository';

export class DeleteUserService implements IDeleteUser {
    constructor(private readonly userRepository: UserRepository) {}

    async delete(user_id: string): Promise<boolean> {
        const user = await this.userRepository.findById(user_id);
        if (user) {
            await this.userRepository.delete(user_id);
            return true;
        }
        return false;
    }
}
