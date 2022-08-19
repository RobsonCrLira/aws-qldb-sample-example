import { DeleteUserController } from '../../app/controller/DeleteUserController';
import { DeleteUserService } from '../../app/service/DeleteUserService';
import { LogControllerDecorator } from '../../decorator/LogDecorator';
import { QldbLogError } from '../../QLDB/qldbLogsErrors';
import { QldbUser } from '../../QLDB/qldbUser';
import { UserPostgresRepository } from '../../repositories/implements/UserPostgresRepository';
import { Controller } from '../../shared/interfaces/controller';

export const makeDeleteUserController = (): Controller => {
    const qldbUser = new QldbUser();
    const userPostgresRepository = new UserPostgresRepository(qldbUser);
    const deleteUserService = new DeleteUserService(userPostgresRepository);
    const deleteUserController = new DeleteUserController(deleteUserService);
    const logError = new QldbLogError();
    return new LogControllerDecorator(deleteUserController, logError);
};
