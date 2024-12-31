import {Request} from "express";

export interface UserTask extends Request {
  query: {
    id: string;
  };
}
