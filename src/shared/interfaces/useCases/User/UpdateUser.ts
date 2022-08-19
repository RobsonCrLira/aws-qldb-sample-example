import { UserDTO } from '../../../../interface/UsersDTO';

export interface IUpdateUser {
    update(user: UserDTO): Promise<any | null>;
}
