import {NextFunction, Request, Response} from "express";
import {AuthUseCase} from "../../../application/auth/usecases/auth.usecase";
import * as logger from "firebase-functions/logger";
import {CodeStatus} from "../../../constants/http/status.constants";
import {ApiResponse} from "../../shared/api-response";
import {User} from "../../../domain/users/user.entity";

export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  async login(req: Request, res: Response, next: NextFunction) {
    const loginEmail = req.body.email;
    logger.info("Entro controller login", loginEmail);
    try {
      const user = await this.authUseCase.verifyUserLogin(loginEmail);
      res.status(CodeStatus.OK).json(
        ApiResponse.success<User>(user)
      );
    } catch (error) {
      logger.info("Entro al catch de login controller: ", error);
      next(error);
    }
  }
}
