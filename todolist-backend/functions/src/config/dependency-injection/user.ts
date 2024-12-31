import {UsersUseCase} from "../../app/users/usecases/users.usecase";
import {FirestoreUserRepository} from "../../infra/database/user.repository";

import {UserController} from "../../infra/express/controllers/user.controller";

export function createUserController(): UserController {
  const userRepository = new FirestoreUserRepository();
  const getUsersUseCase = new UsersUseCase(userRepository);
  return new UserController(getUsersUseCase);
}
