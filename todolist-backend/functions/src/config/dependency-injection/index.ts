import { createAuthController } from './auth';
import { createTasksController } from './tasks';
import { createUserController } from './user';


export const Assemblers = {
  userController: createUserController,
  tasksController: createTasksController,
  authController: createAuthController,
};