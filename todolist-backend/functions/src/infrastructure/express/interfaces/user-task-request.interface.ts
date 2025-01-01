import {Request} from "express";

export interface UserTaskRequest extends Request {
  query: {
    id: string;
  };
}
