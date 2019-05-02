import { Response } from "../common";
import { jwt } from "../common/jwt";

// Need to fix the middleware
export class JWTMiddleware {
  public static async verify(req, res, next) {
    if (req.headers.authorization) {
      await jwt.verifyJWTForUser(req.headers.authorization);
    } else {
      return next(Response.BadRequest());
    }
  }
}
