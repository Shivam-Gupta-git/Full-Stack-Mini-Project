import { Contact } from "../model/contact.model.js"

export const findContact = async (req, res, next) => {
  const contactId = await Contact.findById(req.params.id)
  if(!contactId){
    return res.status(404).json({ message: "ContactId not found" });
  }
  req.savedContactId = contactId;
  next()
}
