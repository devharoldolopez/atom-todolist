import { User } from "../../../domain/users/user.entity";


export interface UserRepository {
  getAllUsers(): Promise<User[]>;
  getUserByEmail(email:string): Promise<User>;
  insertUser(user: User): Promise<User>
  updateUser(user: User): Promise<User>;
  deleteUser(id:string): Promise<void>;
}