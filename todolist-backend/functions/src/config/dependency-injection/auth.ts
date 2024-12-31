import {AuthUseCase} from "../../app/auth/usecases/auth.usecase";
import {FirestoreAuthRepository} from "../../infra/database/auth.repository";
import {AuthController} from "../../infra/express/controllers/auth.controller";

export function createAuthController(): AuthController {
  const authRepository = new FirestoreAuthRepository();
  const getUsersUseCase = new AuthUseCase(authRepository);
  return new AuthController(getUsersUseCase);
}
