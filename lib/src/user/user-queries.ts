import { User } from "./models/user";
import { userModel } from "./models/user-schema";

export class UserQueries {
  public static async addUser(user: User) {
    const userData = new userModel(user);
    await userData.save();
  }

  public static async getUserByEmail(
    email: string,
    passwordRequired: boolean = false
  ) {
    const user = await userModel.findOne({ email });
    if (user) {
      return {
        email: user.email,
        name: user.name,
        password: passwordRequired ? user.password : "*******"
      };
    } else {
      return null;
    }
  }
}
