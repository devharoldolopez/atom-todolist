import {NextFunction, Request, Response} from "express";

import * as logger from "firebase-functions/logger";
import {User} from "../../../domain/users/user.entity";
import {UsersUseCase} from "../../../application/users/usecases/users.usecase";
import {ApiResponse} from "../../shared/api-response";
import {CodeStatus} from "../../../constants/http/status.constants";
import {ResponseConstants} from "../../../constants/http/response.constants";

export class UserController {
  constructor(private readonly usersUseCase: UsersUseCase) {}

  async getUsers(_req: Request, res: Response, next: NextFunction) {
    logger.info("Entro controller getUsers");
    try {
      const users = await this.usersUseCase.getAllUsers();
      res.status(CodeStatus.OK).json(
        ApiResponse.success<User[]>(users)
      );
    } catch (error) {
      logger.info("Entro al catch de getUsers controller: ", error);
      next(error);
    }
  }

  async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    const userEmail = req.params.email;
    logger.info("Entro controller getUserByEmail: ", userEmail);
    try {
      const user = await this.usersUseCase.getUserByEmail(userEmail);
      res.status(CodeStatus.OK).json(
        ApiResponse.success<User>(user)
      );
    } catch (error) {
      logger.info("Entro al catch de getUserByEmail controller: ", error);
      next(error);
    }
  }

  async insertUser(req: Request, res: Response, next: NextFunction) {
    logger.info("Entro controller insertUser");
    try {
      const userParam = new User(req.body.username, req.body.email);
      const user = await this.usersUseCase.insertUser(userParam);
      res.status(CodeStatus.OK_INSERTED).json(
        ApiResponse.success<User>(user, ResponseConstants.USER_CREATED_SUCCESS)
      );
    } catch (error) {
      logger.info("Entro al catch de insertUser controller: ", error);
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    logger.info("Entro controller updateUser: ", userId);
    try {
      const userParam = new User(req.body.username, req.body.email, userId);
      const user = await this.usersUseCase.updateUser(userParam);
      res.status(CodeStatus.OK).json(
        ApiResponse.success<User>(user, ResponseConstants.USER_UPDATED_SUCCESS)
      );
    } catch (error) {
      logger.info("Entro al catch de insertUser controller: ", error);
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    logger.info("Entro controller deleteUser: ", userId);
    try {
      await this.usersUseCase.deleteUser(userId);
      res.status(CodeStatus.OK).json(
        ApiResponse.success(undefined, ResponseConstants.USER_DELETED_SUCCESS)
      );
    } catch (error) {
      logger.info("Entro al catch de deleteUser controller: ", error);
      next(error);
    }
  }
}
