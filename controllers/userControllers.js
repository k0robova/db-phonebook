import gravatar from 'gravatar';

import HttpError from '../helpers/HttpError.js';
import { createUser, emailUnique } from '../services/usersServices.js';

export const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await emailUnique(email);
    if (user) {
      throw HttpError(409, 'Email in use');
    }
    const avatar = gravatar.url(email);

    const newUser = await createUser({ ...req.body, avatar });
    res.status(201).json({
      token: newUser.token,
      user: {
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};
