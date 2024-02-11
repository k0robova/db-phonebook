import { UserModel } from "../db/models/userModels";

export const emailUnique = async (email) => {
  const user = await UserModel.findOne({ email });
  return user;
};

export const createUser = async (userData) => {
  const user = new UserModel({ ...userData });
};
