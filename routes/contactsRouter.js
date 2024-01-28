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

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);

contactsRouter.delete('/:contactId', isValidId, deleteContact);

contactsRouter.post('/', validateBody(createContactSchema), createContact);

contactsRouter.put(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  updateContactController
);

export default contactsRouter;
