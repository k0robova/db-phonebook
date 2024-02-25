import jwt from 'jsonwebtoken';
import HttpError from '../helpers/HttpError.js';
import { UserModel } from '../db/models/userModels.js';

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    console.log('1');
    next(HttpError(401, 'Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await UserModel.findById(id);
    console.log(user);

    if (!user || !user.token || user.token !== token) {
      console.log('2');
      next(HttpError(401, 'Not authorized'));
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(HttpError(401, 'Not authorized'));
  }
};
