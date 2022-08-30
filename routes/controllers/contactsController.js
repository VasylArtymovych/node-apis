const ObjectId = require("mongodb").ObjectId;

const listContacts = async (req, res) => {
  const contacts = await req.db.find().toArray();
  return res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const id = req.params.contactId;

  const contact = await req.db.findOne({ _id: ObjectId(id) });
  if (!contact) {
    res
      .status(400)
      .json({ status: `Failure, contact with id: ${id} not found` });
  }
  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;

  const contacts = await req.db.insertOne({ name, email, phone, favorite });
  res.status(200).json(contacts);
};

const removeContact = async (req, res) => {
  const id = req.params.contactId;

  const contacts = await req.db.deleteOne({ _id: ObjectId(id) });
  res.status(200).json(contacts);
};

const updateContact = async (req, res) => {
  const id = req.params.contactId;

  const contact = await req.db.updateOne(
    { _id: ObjectId(id) },
    { $set: { ...req?.body } }
  );
  res.status(200).json(contact);
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
