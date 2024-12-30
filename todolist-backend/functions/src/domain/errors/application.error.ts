export class ApplicationError extends Error {
  constructor(
    public readonly code: string,
    public readonly statusCode: number,
    message: string
  ) {
    super(message);
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string) {
    super('NOT_FOUND', 404, message);
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string) {
    super('VALIDATION_ERROR', 400, message);
  }
}

export class EmailAlreadyExistsError extends ApplicationError {
  constructor(message: string) {
    super('EMAIL_ALREADY_EXISTS', 400, message);
  }
}