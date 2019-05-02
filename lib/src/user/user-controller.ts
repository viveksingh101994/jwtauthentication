import { Response, Utils } from "../common";
import { User } from "./models/user";
import { UserHelper } from "./user-helper";

export class UserController {
  public static async authenticate(req, res, next) {
    const user: User = req.body;
    try {
      const userExist = await UserHelper.authenticateUser(user);
      if (userExist) {
        const userJWT = await UserHelper.generateJWT(userExist);
        if (userJWT) {
          res.set("X-USER", userJWT);
          const response = Response.Success();
          response.message = userExist;
          return next(response);
        }
      }
      return next(Response.BadRequest());
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log("User Controller, authenticate====>", err);
      return next(Response.ServerError());
    }
  }

  public static async register(req, res, next) {
    const user: User = req.body;
    if (!(await UserController.validateParams(user))) {
      return next(Response.PreConditionFailed());
    }
    try {
      const userRegistered = await UserHelper.register(user);
      if (userRegistered) {
        return next(Response.Created());
      } else {
        const response = Response.BadRequest();
        response.message = "user already exist";
        return next(response);
      }
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log("User Controller, register====>", err);
      return next(Response.ServerError());
    }
  }

  private static async validateParams(user: User) {
    if (
      !user.email ||
      !Utils.isEmailValid(user.email) ||
      !user.name ||
      !user.password
    ) {
      return false;
    }
    return true;
  }
}
