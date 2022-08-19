import { ShowUserController } from '../../app/controller/ShowUserController';
import { ShowUserService } from '../../app/service/ShowUserServices';
import { LogControllerDecorator } from '../../decorator/LogDecorator';
import { QldbLogError } from '../../QLDB/qldbLogsErrors';
import { QldbUser } from '../../QLDB/qldbUser';
import { UserPostgresRepository } from '../../repositories/implements/UserPostgresRepository';
import { Controller } from '../../shared/interfaces/controller';

export const makeShowUserController = (): Controller => {
    const qldbUser = new QldbUser();
    const userPostgresRepository = new UserPostgresRepository(qldbUser);
    const showUserService = new ShowUserService(userPostgresRepository);
    const showUserController = new ShowUserController(showUserService);
    const logError = new QldbLogError();
    return new LogControllerDecorator(showUserController, logError);
};
