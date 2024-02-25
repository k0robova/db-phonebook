import {
  getAll,
  addContact,
  removeContact,
  updateContact,
} from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const contacts = await getAll(owner);
    res.json(contacts);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const id = req.params.contactId;
  const { _id: owner } = req.user;

  try {
    const contact = await removeContact(owner, id);

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
  const { _id: owner } = req.user;
  try {
    const contact = await addContact(owner, req.body);

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
  const { _id: owner } = req.user;

  try {
    const contact = await updateContact(id, owner, req.body);

    if (!contact) {
      throw HttpError(404, `Contact with id ${id} not found`);
    }

    res.json(contact);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
