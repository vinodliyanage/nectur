import User from "../types/User";
import { ChromeStorage } from "./storage";

export default class UserService {
  static async get() {
    const result: any = await ChromeStorage.get(["user"]);
    return result.user;
  }

  static async set(items: Object) {
    // TODO: make request to server to set and validate user
    // get the token from the server and set it in the user object
    await ChromeStorage.set({
      user: items,
    });
  }

  static async update(items: Object) {
    const user = await UserService.get();
    const updatedUser = { ...user, ...items };
    await UserService.set(updatedUser);
    return updatedUser;
  }

  static async validate(user: User) {
    return user.token.length > 0;
  }
}
