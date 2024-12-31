import { CommonConstants } from "../../../constants/general/app.constants";

export class User {
  constructor(
    public id: string,
    public email: string,
  ) {}

  static getEmptyUser(){
    return new User(
      CommonConstants.EMPTY_STR,
      CommonConstants.EMPTY_STR
    );
  }
}