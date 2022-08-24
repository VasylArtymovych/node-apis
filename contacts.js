const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const necessaryContact = JSON.parse(contacts).filter(
    ({ id }) => id === contactId
  );
  console.log(necessaryContact);
}

async function removeContact(contactId) {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const updatedContacts = JSON.parse(contacts).filter(
    ({ id }) => id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
  listContacts();
}

async function addContact(name, email, phone) {
  const newContact = { id: uuidv4(), name, phone, email };
  const contacts = await fs.readFile(contactsPath, "utf8");
  const updatedContacts = [...JSON.parse(contacts), newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
  listContacts();
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
