import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { CommonConstants } from '../../../constants/general/app.constants';
import { CodeStatus } from '../../../constants/http/status.constants';

export function validationMiddleware(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      return res.status(CodeStatus.BAD_REQUEST).json({
        message: CommonConstants.VALIDATION_FAILED,
        errors: errors.map(err => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
    }

    return next();
  };
}