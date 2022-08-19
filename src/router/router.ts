import { Router } from 'express';
import { adaptRoute } from '../adapter/express/adapter';
import { makeCreateUserController } from '../factories/CreateUser/CreateUserFactory';
import { makeDeleteUserController } from '../factories/DeleteUser/DeleteUserFactory';
import { makeListUserController } from '../factories/ListUser/ListUserFactory';
import { makeShowUserController } from '../factories/ShowUser/ShowUserFactory';
import { makeUpdateUserController } from '../factories/UpdateUser/UpdateUserFactory';

const router = Router();

router.post('/user', adaptRoute(makeCreateUserController()));
router.get('/user', adaptRoute(makeListUserController()));
router.get('/user/:user_id', adaptRoute(makeShowUserController()));
router.put('/user/:user_id', adaptRoute(makeUpdateUserController()));
router.delete('/user/:user_id', adaptRoute(makeDeleteUserController()));

export default router;
