import { BcryptAdapter } from '../../adapter/bcrypt/bcryptAdapter';
import { UpdateUserController } from '../../app/controller/UpdateUserController';
import { UpdateUserService } from '../../app/service/UpdateUserService';
import { LogControllerDecorator } from '../../decorator/LogDecorator';
import { QldbLogError } from '../../QLDB/qldbLogsErrors';
import { QldbUser } from '../../QLDB/qldbUser';
import { UserPostgresRepository } from '../../repositories/implements/UserPostgresRepository';
import { Controller } from '../../shared/interfaces/controller';

export const makeUpdateUserController = (): Controller => {
    const salt = 12;
    const qldbUser = new QldbUser();
    const userPostgresRepository = new UserPostgresRepository(qldbUser);
    const bcryptAdapter = new BcryptAdapter(salt);
    const updateUserService = new UpdateUserService(
        userPostgresRepository,
        bcryptAdapter,
    );
    const updateUserController = new UpdateUserController(updateUserService);
    const logError = new QldbLogError();
    return new LogControllerDecorator(updateUserController, logError);
};
