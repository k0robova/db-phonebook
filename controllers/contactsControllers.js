import { getAll } from '../services/contactsServices.js';

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await getAll();
    res.json(contacts);
  } catch (error) {}
};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};
