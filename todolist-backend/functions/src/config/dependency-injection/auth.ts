import { AuthUseCase } from '../../application/auth/usecases/auth.usecase';
import { FirestoreAuthRepository } from '../../infrastructure/database/firestore-auth.repository';
import { AuthController } from '../../infrastructure/express/controllers/auth.controller';


export function createAuthController(): AuthController {
  const authRepository = new FirestoreAuthRepository();
  const getUsersUseCase = new AuthUseCase(authRepository);
  return new AuthController(getUsersUseCase);
}