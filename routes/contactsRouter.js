import express from 'express';
import {
  getAllContacts,
  deleteContact,
  createContact,
  updateContactController,
} from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, getAllContacts);

contactsRouter.delete('/:contactId', authenticate, isValidId, deleteContact);

contactsRouter.post(
  '/',
  authenticate,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  updateContactController
);

export default contactsRouter;
