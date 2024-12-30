import { Router } from 'express';
import { TasksController } from '../controllers/tasks.controller';

export default function tasksRoute(tasksController: TasksController): Router {
  const router = Router();

  router.get('/:userId', (req, res, next) => tasksController.getTasksByUser(req, res, next));
  router.post('/', (req, res, next) => tasksController.insertTask(req, res, next));
  router.put('/:taskId', (req, res, next) => tasksController.updateTask(req, res, next));
  router.delete('/:taskId', (req, res, next) => tasksController.deleteTask(req, res, next));

  return router;
}