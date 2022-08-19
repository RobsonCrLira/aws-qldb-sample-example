export interface IDeleteUser {
    delete(user_id: string): Promise<boolean>;
}
