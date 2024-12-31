import { User } from "../../../domain/users/user.entity";


export interface AuthRepository {
  verifyUserLogin(email: string): Promise<User>;
}