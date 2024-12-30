import { Request, Response, NextFunction } from 'express';

import * as logger from "firebase-functions/logger";
import { ApplicationError } from '../../../domain/errors/application.error';

export function errorHandlerMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger.info("errorHandlerMiddleware: ", err)
  if (err instanceof ApplicationError) {
    res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
      code: err.code,
    });
  } else {
    logger.error('Errror inesperado: :', err);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Algo ha salido mal!',
    });
  }
}