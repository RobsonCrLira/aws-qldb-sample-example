import { UserDTO } from '../../../../interface/UsersDTO';

export interface IListUser {
    list(): Promise<UserDTO[]>;
}
