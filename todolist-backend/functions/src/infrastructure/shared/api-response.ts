import { CommonConstants } from '../../constants/general/app.constants';
import { SuccessResponse, ErrorResponse } from '../../domain/shared/responses.interface';

export class ApiResponse {
  static success<T>(payload: T, message = CommonConstants.SUCCESS_MESSAGE_DEFAULT): SuccessResponse<T> {
    return {
      status: CommonConstants.STATUS_OK,
      data: {
        message,
        payload,
      },
    };
  }

  static error(code: string, message: string, details?: any): ErrorResponse {
    return {
      status: CommonConstants.STATUS_ERROR,
      error: {
        code,
        message,
        details,
      },
    };
  }
}