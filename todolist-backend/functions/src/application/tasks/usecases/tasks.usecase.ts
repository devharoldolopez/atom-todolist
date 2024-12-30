
import { Task } from '../../../domain/tasks/tasks.entity';
import { TasksRepository } from '../interfaces/tasks-repository.interface';
import * as logger from "firebase-functions/logger";

export class TasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async getTasksByUser(userId: string): Promise<Task[]> {
    logger.info('Entro getTasksByUser');
    return this.tasksRepository.getTasksByUser(userId);
  }

  async insertTask(userId: string, task: Task): Promise<Task> {
    logger.info('Entro insertTask');
    return this.tasksRepository.insertTask(userId, task);
  }

  async updateTask(task: Task): Promise<Task> {
    logger.info('Entro updateTask');
    return this.tasksRepository.updateTask(task);
  }

  async deleteTask(taskId: string): Promise<void> {
    logger.info('Entro deleteTask');
    return this.tasksRepository.deleteTask(taskId);
  }
}