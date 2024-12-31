import {User} from "../../../domain/users/user.entity";
import * as logger from "firebase-functions/logger";
import {AuthRepository} from "../interfaces/auth.interface";

export class AuthUseCase {
  constructor(private authRepository: AuthRepository) {}

  async verifyUserLogin(email: string): Promise<User> {
    logger.info("Entro verifyUserLogin");
    return this.authRepository.verifyUserLogin(email);
  }
}
