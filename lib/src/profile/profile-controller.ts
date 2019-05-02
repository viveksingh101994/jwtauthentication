import { Response } from "../common";

export class ProfileController {
  public static async users(req, res, next) {
    next(Response.Success());
  }
}
