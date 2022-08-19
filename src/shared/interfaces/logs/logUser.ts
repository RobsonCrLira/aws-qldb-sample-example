import { UserModel } from '../DTOs/UsersDTO';

export interface LogUserDTO {
    data: UserModel; // Informação que o usuário passou
    method: string; // é o metodo que será usado UPDATE ,INSERT ou DELETE
}
export interface LogUser {
    query(data: LogUserDTO): Promise<void>;
}
