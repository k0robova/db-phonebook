import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, default: "" },
    avatar: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const UserModel = model("user", userSchema);
