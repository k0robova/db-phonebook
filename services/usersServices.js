import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserModel } from '../db/models/userModels.js';

dotenv.config();

const { SECRET_KEY } = process.env;

export const emailUnique = async (email) => {
  const user = await UserModel.findOne({ email });
  return user;
};

export const createUser = async (userData) => {
  const user = new UserModel({ ...userData });

  await user.hashPassword();
  await user.save();

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);

  const newUser = await UserModel.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );
  return newUser;
};
