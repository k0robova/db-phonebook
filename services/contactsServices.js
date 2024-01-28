import { ContactModel } from '../db/models/contactModels.js';

export const getAll = async () => {
  const contacts = await ContactModel.find();
  return contacts;
};

export const addContact = async (data) => {
  const exist = await ContactModel.findOne({ number: data.number });

  if (exist) {
    return {
      error: 'Contact with such number already exists',
    };
  }

  const contact = await ContactModel.create(data);
  return contact;
};

export const removeContact = async (contactId) => {
  const contact = await ContactModel.findByIdAndDelete(contactId);
  return contact;
};

export const updateContact = async (contactId, data) => {
  const contact = await ContactModel.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  return contact;
};
