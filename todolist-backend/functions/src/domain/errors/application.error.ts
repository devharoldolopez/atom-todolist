export class ApplicationError extends Error {
  constructor(
    public readonly internalCode: number,
    public readonly statusCode: number,
    message: string
  ) {
    super(message);
  }
}

export class NotFoundError extends ApplicationError {
  constructor(internalCode:number, message: string) {
    super(internalCode, 404, message);
  }
}

export class ValidationError extends ApplicationError {
  constructor(internalCode:number, message: string) {
    super(internalCode, 400, message);
  }
}

export class EmailAlreadyExistsError extends ApplicationError {
  constructor(internalCode:number, message: string) {
    super(internalCode, 400, message);
  }
}


export class GeneralError extends ApplicationError {
  constructor(internalCode:number, message: string) {
    super(internalCode, 500, message);
  }
}
