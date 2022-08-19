import { UserModel } from '../shared/interfaces/DTOs/UsersDTO';

export interface UserCreate {
    full_name: string;
    password_hash: string;
    email: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserRepository {
    create(data: UserCreate): Promise<void>;
    update(data: UserModel): Promise<void>;
    delete(user_id: string): Promise<void>;
    list(): Promise<UserModel[]>;
    show(user_id: string): Promise<UserModel | null>;
    findByEmail(email: string): Promise<UserModel | null>;
    findById(user_id: string): Promise<UserModel | null>;
}
