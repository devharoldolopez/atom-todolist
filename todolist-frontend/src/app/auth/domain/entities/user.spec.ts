import { CommonConstants } from "../../../constants/general/app.constants";
import { User } from "./user";

describe('User', () => {
  it('should create an empty user', () => {
    const user:User = User.getEmptyUser();
    expect(user.id).toEqual(CommonConstants.EMPTY_STR);
  });
});