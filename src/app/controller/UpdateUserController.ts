import { IUpdateUser } from '../../shared/interfaces/useCases/User/UpdateUser';
import { Controller } from '../../shared/interfaces/controller';
import { HttpRequest, HttpResponse } from '../../shared/interfaces/http';
import { MissingParamError } from '../../shared/errors';
import {
    badRequest,
    notFound,
    ok,
    serverError,
} from '../../shared/httpHelpers';

export class UpdateUserController implements Controller {
    constructor(private readonly updateUserService: IUpdateUser) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { name, email, password } = httpRequest.body;
            const { user_id } = httpRequest.params;

            if (!user_id) {
                return badRequest(new MissingParamError('user_id is required'));
            }
            if (!email) {
                return badRequest(new MissingParamError('email is required'));
            }
            if (!name) {
                return badRequest(new MissingParamError('name is required'));
            }

            const response = await this.updateUserService.update({
                email,
                full_name: name,
                password,
                id: user_id,
            });
            if (response) {
                return notFound(response);
            }
            return ok({ message: 'Usuário is update' });
        } catch (error) {
            return serverError(error);
        }
    }
}
