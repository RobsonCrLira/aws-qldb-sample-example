export interface ICreateUser {
    create(user: {
        email: string;
        password: string;
        full_name: string;
    }): Promise<void>;
}
