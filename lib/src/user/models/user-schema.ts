import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Model = mongoose.model("user", UserSchema);
export const userModel = Model;
