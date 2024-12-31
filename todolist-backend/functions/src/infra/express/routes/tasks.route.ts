import {Response, Router, Request} from "express";
import {TasksController} from "../controllers/task.controller";
import {UserTask} from "../interfaces/user-task.interface";

export default function tasksRoute(tasksController: TasksController): Router {
  const router = Router();

  router.get(
    "/",
    (req: UserTask, res: Response, next) =>
      tasksController.getTasksByUser(req, res, next)
  );
  router.post("/",
    (req: Request, res: Response, next) =>
      tasksController.insertTask(req, res, next)
  );
  router.put("/:taskId",
    (req: Request, res: Response, next) =>
      tasksController.updateTask(req, res, next)
  );
  router.delete("/:taskId",
    (req: Request, res: Response, next) =>
      tasksController.deleteTask(req, res, next)
  );

  return router;
}
