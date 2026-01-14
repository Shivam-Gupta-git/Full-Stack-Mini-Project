import express from 'express';
import { addContact, deleteContact, getAllContact, updateContact } from '../controller/contact.controller.js';
import { findContact } from '../middleware/contact.middleware.js';

const contactRouter = express.Router();

contactRouter.post('/addContact', addContact);
contactRouter.patch('/updatedContact/:id', findContact, updateContact)
contactRouter.delete('/deleteContacd/:id', findContact, deleteContact)
contactRouter.get('/getallcontact', getAllContact)

export { contactRouter }