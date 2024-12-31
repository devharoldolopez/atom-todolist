import {TasksUseCase} from "../../app/tasks/usecases/tasks.usecase";
import {FirestoreTasksRepository} from "../../infra/database/tasks.repository";
import {TasksController} from "../../infra/express/controllers/task.controller";

export function createTasksController(): TasksController {
  const tasksRepository = new FirestoreTasksRepository();
  const getTasksUseCase = new TasksUseCase(tasksRepository);
  return new TasksController(getTasksUseCase);
}
