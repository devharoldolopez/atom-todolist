import {NextFunction, Request, Response} from "express";

import * as logger from "firebase-functions/logger";

import {ApiResponse} from "../../shared/api-response";
import {CodeStatus} from "../../../constants/http/status.constants";
import {TasksUseCase} from "../../../app/tasks/usecases/tasks.usecase";
import {Task} from "../../../domain/tasks/tasks.entity";
import {ResponseConstants} from "../../../constants/http/response.constants";
import {CommonConstants} from "../../../constants/general/app.constants";
import {UserTask} from "../interfaces/user-task.interface";
import {convertFirestoreTimestampToDate} from "../../utils/firestore-utils";

export class TasksController {
  constructor(private readonly tasksUseCase: TasksUseCase) {}

  async getTasksByUser(req: UserTask, res: Response, next: NextFunction) {
    const userId:string = req.query.id;
    logger.info("Entro controller getTasksByUser: ", userId);

    try {
      const tasks = await this.tasksUseCase.getTasksByUser(userId);
      const tasksResponse:Array<Task> = tasks.map((task) => ({
        ...task,
        createdDate: convertFirestoreTimestampToDate(task),
      }));

      res.status(CodeStatus.OK).json(
        ApiResponse.success<Task[]>(tasksResponse)
      );
    } catch (error) {
      logger.info("Entro al catch de getTasksByUser controller: ", error);
      next(error);
    }
  }

  async insertTask(req: Request, res: Response, next: NextFunction) {
    logger.info("Entro controller insertTask");
    try {
      const userId = req.body.userId;
      const taskParam = new Task(
        req.body.title,
        req.body.description,
        req.body.state
      );
      const task = await this.tasksUseCase.insertTask(userId, taskParam);
      res.status(CodeStatus.OK_INSERTED).json(
        ApiResponse.success<Task>(task, ResponseConstants.TASK_CREATED_SUCCESS)
      );
    } catch (error) {
      logger.info("Entro al catch de insertTask controller: ", error);
      next(error);
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    const taskId = req.params.taskId;
    logger.info("Entro controller updateTask ", taskId);
    try {
      const taskParam = new Task(
        req.body.title,
        req.body.description,
        req.body.state,
        CommonConstants.FIELD_NOT_DEFINED,
        CommonConstants.FIELD_NOT_DEFINED,
        taskId
      );
      const task = await this.tasksUseCase.updateTask(taskParam);
      res.status(CodeStatus.OK).json(
        ApiResponse.success<Task>(task, ResponseConstants.TASK_UPDATED_SUCCESS)
      );
    } catch (error) {
      logger.info("Entro al catch de updateTask controller: ", error);
      next(error);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    const taskId = req.params.taskId;
    logger.info("Entro controller deleteTask: ", taskId);
    try {
      await this.tasksUseCase.deleteTask(taskId);
      res.status(CodeStatus.OK).json(
        ApiResponse.success(undefined, ResponseConstants.TASK_DELETED_SUCCESS)
      );
    } catch (error) {
      logger.info("Entro al catch de deleteTask controller: ", error);
      next(error);
    }
  }
}
