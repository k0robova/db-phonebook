import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, default: '' },
    avatar: { type: String },
  },
  {
    versionKey: false,
  }
);

userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

export const UserModel = model('user', userSchema);
