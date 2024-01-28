import {
  getAll,
  addContact,
  removeContact,
  updateContact,
} from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (_, res, next) => {
  try {
    const contacts = await getAll();
    res.json(contacts);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const contact = await removeContact(id);

    if (!contact) {
      throw HttpError(404, `Contact with id ${id} not found`);
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);

    if (contact.error) {
      throw HttpError(409, contact.error);
    }

    res.status(201).json(contact);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const contact = await updateContact(id, req.body);

    if (!contact) {
      throw HttpError(404, `Contact with id ${id} not found`);
    }

    res.json(contact);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
