import { CommonConstants } from "../../../constants/general/app.constants";

export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public state: string,
    public createdDate: Date,
  ) {}

  static getEmptyTask(){
    return new Task(
      CommonConstants.EMPTY_STR,
      CommonConstants.EMPTY_STR,
      CommonConstants.EMPTY_STR,
      CommonConstants.EMPTY_STR,
      new Date())
  }
}