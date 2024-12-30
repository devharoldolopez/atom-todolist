
import { EmailAlreadyExistsError, NotFoundError, ValidationError } from "../../domain/errors/application.error";


export class ErrorService {
  static throwEmailExistsError(message: string): never {
    throw new EmailAlreadyExistsError(message);
  }

  static throwNotFound(message: string): never {
    throw new NotFoundError(message);
  }

  static throwValidationError(message: string): never {
    throw new ValidationError(message);
  }

}