import { ContactModel } from '../db/models/contactModels.js';

export const getAll = async () => {
  const contacts = await ContactModel.find();
  return contacts;
};
