import express from 'express';
import {
  getAllContacts,
  deleteContact,
  createContact,
} from '../controllers/contactsControllers.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);

contactsRouter.delete('/:contactId', deleteContact);

contactsRouter.post('/', createContact);

export default contactsRouter;
