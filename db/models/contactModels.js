import { Schema, model } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    owner: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export const ContactModel = model('contact', contactsSchema);
