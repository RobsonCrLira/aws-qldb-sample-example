import { UserDTO } from '../../DTOs/UsersDTO';

export interface IShowUser {
    show(user_id: string): Promise<UserDTO | null>;
}
