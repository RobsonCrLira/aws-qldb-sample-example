import { IShowUser } from '../../shared/interfaces/useCases/User/showUser';
import { Controller } from '../../shared/interfaces/controller';
import { HttpRequest, HttpResponse } from '../../shared/interfaces/http';
import { ok, serverError } from '../../shared/httpHelpers';

export class ShowUserController implements Controller {
    constructor(private readonly showUserService: IShowUser) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { user_id } = httpRequest.params;
            const user = await this.showUserService.show(user_id);
            return ok(user);
        } catch (error) {
            return serverError(error);
        }
    }
}
