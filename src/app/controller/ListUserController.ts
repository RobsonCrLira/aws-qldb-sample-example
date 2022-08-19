import { IListUser } from '../../shared/interfaces/useCases/User/ListUser';
import { Controller } from '../../shared/interfaces/controller';
import { HttpRequest, HttpResponse } from '../../shared/interfaces/http';
import { serverError } from '../../shared/httpHelpers';

export class ListUserController implements Controller {
    constructor(private readonly listUsersService: IListUser) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const users = await this.listUsersService.list();
            return { body: users, statusCode: 200 };
        } catch (error) {
            return serverError(error);
        }
    }
}
