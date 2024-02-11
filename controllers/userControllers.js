import gravatar from "gravatar";

import HttpError from "../helpers/HttpError.js";
import { createUser, emailUnique } from "../services/usersServices";

export const signup = async (res, req, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await emailUnique(email);
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const avatar = gravatar.url(email);

    const result = await createUser({ ...req.body, avatar });
  } catch (error) {
    next(error);
  }
};
