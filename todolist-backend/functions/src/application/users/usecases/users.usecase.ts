import {User} from "../../../domain/users/user.entity";
import {UserRepository} from "../interfaces/user.interface";
import * as logger from "firebase-functions/logger";

export class UsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    logger.info("Entro GetUsersUseCase");
    return this.userRepository.getAllUsers();
  }

  async getUserByEmail(email: string): Promise<User> {
    logger.info("Entro getUserByEmail");
    return this.userRepository.getUserByEmail(email);
  }

  async insertUser(user: User): Promise<User> {
    logger.info("Entro insertUser");
    return this.userRepository.insertUser(user);
  }

  async updateUser(user: User): Promise<User> {
    logger.info("Entro updateUser");
    return this.userRepository.updateUser(user);
  }

  async deleteUser(id: string): Promise<void> {
    logger.info("Entro deleteUser");
    return this.userRepository.deleteUser(id);
  }
}
