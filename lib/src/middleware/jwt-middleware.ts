import { Response } from "../common";
import { jwt } from "../common/jwt";

// Need to fix the middleware
export class JWTMiddleware {
  public static async verify(req, res, next) {
    if (req.headers.authorization) {
      try {
        const decoded: any = await jwt.verifyandDecodeJwt(
          req.headers.authorization
        );
        req.user = decoded.context;
        return next();
      } catch (err) {
        return next(Response.BadRequest());
      }
    } else {
      return next(Response.BadRequest());
    }
  }
}
