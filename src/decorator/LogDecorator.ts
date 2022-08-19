import * as crypto from 'crypto';
import { LogErrors } from '../shared/interfaces/logs/logErrors';
import { Controller } from '../shared/interfaces/controller';
import { HttpRequest, HttpResponse } from '../shared/interfaces/http';

export class LogControllerDecorator implements Controller {
    constructor(
        private readonly controller: Controller,
        private readonly logErrorRepository: LogErrors,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse = await this.controller.handle(httpRequest);
        if (httpResponse.statusCode === 500) {
            await this.logErrorRepository.log({
                log_id: crypto.randomUUID(),
                error: httpResponse.body.stack,
            });
        }
        return httpResponse;
    }
}
