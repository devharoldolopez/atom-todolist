import { User } from "../../../domain/users/user.entity";


export interface UserRepository {
  getAllUsers(): Promise<User[]>;
  getUserByEmail(email:string): Promise<User | undefined>;
  insertUser(user: User): Promise<User | undefined>
  updateUser(user: User): Promise<User | undefined>;
  deleteUser(id:string): Promise<void>;
}