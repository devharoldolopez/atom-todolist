import { CommonConstants } from "../../../constants/general/app.constants";
import { Task } from "./task";

describe('Task', () => {
  it('should create an empty task', () => {
    const task = new Task(
      CommonConstants.EMPTY_STR,
      CommonConstants.EMPTY_STR,
      CommonConstants.EMPTY_STR,
      CommonConstants.EMPTY_STR,
      new Date());

    expect(Task.getEmptyTask().id).toEqual(CommonConstants.EMPTY_STR);
  });

});