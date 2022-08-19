import { ICreateUser } from '../../shared/interfaces/useCases/User/CreateUser';
import { Controller } from '../../shared/interfaces/controller';
import { HttpRequest, HttpResponse } from '../../shared/interfaces/http';
import { badRequest, ok, serverError } from '../../shared/httpHelpers';
import { MissingParamError } from '../../shared/errors';

export class CreateUserController implements Controller {
    constructor(private readonly createUserService: ICreateUser) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { name, email, password } = httpRequest.body;
            if (!password) {
                return badRequest(
                    new MissingParamError('password is required'),
                );
            }
            if (!email) {
                return badRequest(new MissingParamError('email is required'));
            }
            if (!name) {
                return badRequest(new MissingParamError('name is required'));
            }

            await this.createUserService.create({
                email,
                full_name: name,
                password,
            });

            return ok({ message: 'Usuário Create' });
        } catch (error) {
            console.log(error);
            return serverError(error);
        }
    }
}
