import { Contact } from "../model/contact.model.js";

export const addContact = async (req, res) => {
  try {
    const {name, number} = req.body;
    if([name, number].some((fields) => !fields || fields?.trim() === '')){
      return req.status(400).json({success: false, message: 'Name and Number is required'})
    }

    const existContact = await Contact.findOne({number})
    if(existContact){
      return res.status(400).json({success: false, message: 'Number is allready exist'})
    }

    const newContact = await Contact({
      name,
      number
    });

    await newContact.save();
    res.status(200).json({
      success: true, message: 'Contact is save successfully', user: newContact
    })
  } catch (error) {
    console.log('Error', error)
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id){
      return res.status(400).json({success: false, message: 'contact Id is required'})
    }

    const { name, number } = req.body;
    if (!name || !number) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, number },
      { new: true }
    ).select("-number");

    if (!updatedContact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteContact = async (req, res) => {
try {
    const { id } = req.params;
    if(!id){
      return res.status(400).json({success: false, message: 'Contact Id is required'})
    }
    
    const existingContactId = await Contact.findById(id)
    if(!existingContactId){
      return res.status(400).json({success: false, message: 'contact Id can not be exist'})
    }
  
    await Contact.findByIdAndDelete(existingContactId);
    return res.status(200).json({success: true, message: "Contact deleting succesfully"})
} catch (error) {
  console.log("Error", error)
  res.status(500).json({success: false, message: error.message})
}
}

export const getAllContact = async (req, res) => {
  try {
    const contact = await Contact.find()
    return res.status(200).json({success: true, data: contact})
  } catch (error) {
    console.log('Error', error)
    res.status(500).json({success: false, message: error.message})
  }
}