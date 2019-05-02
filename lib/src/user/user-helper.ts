import * as bcrypt from "bcrypt";
import { jwt } from "../common/jwt";
import { User } from "./models/user";
import { UserQueries } from "./user-queries";

export class UserHelper {
  public static async register(user: User) {
    user.password = await bcrypt.hashSync(user.password, 10);
    if (await UserHelper.checkIfUserAlreadyExist(user)) {
      return false;
    } else {
      await UserQueries.addUser(user);
      return true;
    }
  }
  public static async checkIfUserAlreadyExist(user: User) {
    const userFromDB = await UserQueries.getUserByEmail(user.email);
    if (userFromDB) {
      return true;
    } else {
      return false;
    }
  }
  public static async authenticateUser(user: User) {
    const passwordRequired = true;
    const userFromDB = await UserQueries.getUserByEmail(
      user.email,
      passwordRequired
    );
    if (userFromDB) {
      const isMatch = await bcrypt.compare(user.password, userFromDB.password);
      if (isMatch) {
        return {
          email: userFromDB.email,
          name: userFromDB.name
        };
      } else {
        return null;
      }
    }
    return null;
  }

  public static async generateJWT(user) {
    const claims = {
      context: {
        name: user.name,
        email: user.email
      },
      sub: user.email
    };
    return await jwt.generateJwtForUser(claims);
  }
}
