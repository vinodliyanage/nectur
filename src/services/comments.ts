import { ChromeStorage } from "./storage";

export default class CommentService {
  static async get() {
    // TODO: make the request to the backend server and get the comments.
    // TODO: if it failed or timeout, return the chrome storage data.
    const result: any = await ChromeStorage.get(["comments"]);
    return result.comments;
  }

  static async set(items: Object) {
    // TODO: post new comment to the database.
    // TODO: save the new comments to the chrome storage.
    return await ChromeStorage.set({ comments: items });
  }
}
