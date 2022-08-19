import { IDeleteUser } from '../../shared/interfaces/useCases/User/DeleteUser';
import { Controller } from '../../shared/interfaces/controller';
import { HttpRequest, HttpResponse } from '../../shared/interfaces/http';
import { notFound, ok, serverError } from '../../shared/httpHelpers';
import { NotFoundError } from '../../shared/errors/notFoundError';

export class DeleteUserController implements Controller {
    constructor(private readonly deleteUserService: IDeleteUser) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { user_id } = httpRequest.params;
            const user = await this.deleteUserService.delete(user_id);
            if (user)
                return ok({
                    message: 'User delete successful',
                    statusCode: 200,
                });
            return notFound(new NotFoundError(`User ${user_id}  not found`));
        } catch (error) {
            return serverError(error);
        }
    }
}
