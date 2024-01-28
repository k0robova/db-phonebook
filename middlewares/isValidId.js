import { isValidObjectId } from 'mongoose';
import HttpError from '../helpers/HttpError.js';

export const isValidId = (req, _, next) => {
  const id = req.params.contactId;

  if (!isValidObjectId(id)) {
    next(HttpError(400, `Requested id(${id}) is invalid`));
    return;
  }

  next();
};
