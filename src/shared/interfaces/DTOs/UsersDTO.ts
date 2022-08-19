export interface UserDTO {
    id: string;
    full_name: string;
    password?: string;
    email: string;
    updated_at?: Date;
}
export interface UserModel {
    id: string;
    full_name: string;
    password?: string;
    password_hash: string;
    email: string;
    created_at?: Date;
    updated_at?: Date;
}
