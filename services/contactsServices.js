import { ContactModel } from '../db/models/contactModels.js';

export const getAll = async (owner) => {
  const contacts = await ContactModel.find({ owner });
  return contacts;
};

export const addContact = async (owner, data) => {
  const exist = await ContactModel.findOne({ number: data.number });

  if (exist) {
    return {
      error: 'Contact with such number already exists',
    };
  }

  const contact = await ContactModel.create({ ...data, owner });
  return contact;
};

export const removeContact = async (owner, contactId) => {
  const contact = await ContactModel.findByIdAndDelete(contactId)
    .where('owner')
    .equals(owner);
  return contact;
};

export const updateContact = async (contactId, owner, data) => {
  const contact = await ContactModel.findOneAndUpdate(
    { _id: contactId, owner },
    data,
    {
      new: true,
    }
  );
  return contact;
};
