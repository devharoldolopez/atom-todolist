import {UsersUseCase} from "../../application/users/usecases/users.usecase";
import {FirestoreUserRepository} from "../../infrastructure/database/firestore-user.repository";

import {UserController} from "../../infrastructure/express/controllers/user.controller";

export function createUserController(): UserController {
  const userRepository = new FirestoreUserRepository();
  const getUsersUseCase = new UsersUseCase(userRepository);
  return new UserController(getUsersUseCase);
}
