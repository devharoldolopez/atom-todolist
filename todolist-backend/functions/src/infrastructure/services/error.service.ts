import {
  EmailAlreadyExistsError,
  GeneralError,
  NotFoundError,
  ValidationError,
} from "../../domain/errors/application.error";

export class ErrorService {
  static throwNotFound(internalCode:number, message: string): never {
    throw new NotFoundError(internalCode, message);
  }

  static throwValidationError(internalCode:number, message: string): never {
    throw new ValidationError(internalCode, message);
  }

  static throwEmailExistsError(internalCode:number, message: string):never {
    throw new EmailAlreadyExistsError(internalCode, message);
  }

  static throwGeneralError(internalCode:number, message: string):never {
    throw new GeneralError(internalCode, message);
  }
}
