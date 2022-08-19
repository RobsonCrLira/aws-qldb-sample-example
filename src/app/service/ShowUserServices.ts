import { IShowUser } from '../../shared/interfaces/useCases/User/showUser';
import { UserRepository } from '../../repositories/UserRepository';
import { UserDTO } from '../../shared/interfaces/DTOs/UsersDTO';

export class ShowUserService implements IShowUser {
    constructor(private readonly userRepository: UserRepository) {}

    async show(user_id: string): Promise<UserDTO | null> {
        const user = await this.userRepository.show(user_id);
        if (user) {
            const { id, full_name, email } = user;
            return {
                id,
                full_name,
                email,
                updated_at: user.updated_at,
            };
        }
        return null;
    }
}
