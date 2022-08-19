import { ListUserController } from '../../app/controller/ListUserController';
import { ListUserService } from '../../app/service/ListUserServices';
import { LogControllerDecorator } from '../../decorator/LogDecorator';
import { QldbLogError } from '../../QLDB/qldbLogsErrors';
import { QldbUser } from '../../QLDB/qldbUser';
import { UserPostgresRepository } from '../../repositories/implements/UserPostgresRepository';
import { Controller } from '../../shared/interfaces/controller';

export const makeListUserController = (): Controller => {
    const qldbUser = new QldbUser();
    const userPostgresRepository = new UserPostgresRepository(qldbUser);
    const listUserService = new ListUserService(userPostgresRepository);
    const listUserController = new ListUserController(listUserService);
    const logError = new QldbLogError();
    return new LogControllerDecorator(listUserController, logError);
};
