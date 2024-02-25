import gravatar from 'gravatar';
import { UserModel } from '../db/models/userModels.js';

import HttpError from '../helpers/HttpError.js';
import {
  createUser,
  emailUnique,
  loginUser,
} from '../services/usersServices.js';

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

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await emailUnique(email);
    if (!user) {
      throw HttpError(401, 'User not found');
    }
    const isValidPassword = user.comparePassword(password);
    if (!isValidPassword) {
      throw HttpError(401, 'User not found');
    }
    const updatedUser = await loginUser(user);
    res.json({
      token: updatedUser.token,
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  const { _id } = req.user;
  try {
    await UserModel.findByIdAndUpdate(_id, { token: '' });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const current = async (req, res) => {
  const { name, email, avatar } = req.user;
  res.json({ name, email, avatar });
};
