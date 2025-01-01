import {TasksUseCase} from "../../application/tasks/usecases/tasks.usecase";
import {FirestoreTasksRepository} from "../../infrastructure/database/firestore-tasks.repository";
import {TasksController} from "../../infrastructure/express/controllers/task.controller";

export function createTasksController(): TasksController {
  const tasksRepository = new FirestoreTasksRepository();
  const getTasksUseCase = new TasksUseCase(tasksRepository);
  return new TasksController(getTasksUseCase);
}
