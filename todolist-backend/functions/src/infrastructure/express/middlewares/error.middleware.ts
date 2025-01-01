import {Request, Response, NextFunction} from "express";

import * as logger from "firebase-functions/logger";
import {ApplicationError} from "../../../domain/errors/application.error";
import {ApiResponse} from "../../shared/api-response";
import {CommonConstants} from "../../../constants/general/app.constants";
import {CodeStatus} from "../../../constants/http/status.constants";

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger.info("errorHandlerMiddleware: ", err);
  if (err instanceof ApplicationError) {
    res.status(err.statusCode).json(
      ApiResponse.error(err.internalCode, err.message)
    );
  } else {
    logger.error("Error inesperado: :", err);
    res.status(CodeStatus.SERVER_ERROR).json(
      ApiResponse.error(
        CommonConstants.INTERNAL_SERVER_ERROR,
        CommonConstants.INTERNAL_SERVER_ERROR_MSG
      )
    );
  }
}
