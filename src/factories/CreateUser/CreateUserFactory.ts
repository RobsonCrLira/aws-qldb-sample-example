import { BcryptAdapter } from '../../adapter/bcrypt/bcryptAdapter';
import { CreateUserController } from '../../app/controller/CreateUserController';
import { CreateUserService } from '../../app/service/CreateUserService';
import { LogControllerDecorator } from '../../decorator/LogDecorator';
import { QldbLogError } from '../../QLDB/qldbLogsErrors';
import { QldbUser } from '../../QLDB/qldbUser';
import { UserPostgresRepository } from '../../repositories/implements/UserPostgresRepository';
import { Controller } from '../../shared/interfaces/controller';

export const makeCreateUserController = (): Controller => {
    const salt = 12;
    const qldbUser = new QldbUser();
    const userPostgresRepository = new UserPostgresRepository(qldbUser);
    const bcryptAdapter = new BcryptAdapter(salt);
    const createUserService = new CreateUserService(
        userPostgresRepository,
        bcryptAdapter,
    );
    const createUserController = new CreateUserController(createUserService);
    const logError = new QldbLogError();
    return new LogControllerDecorator(createUserController, logError);
};
