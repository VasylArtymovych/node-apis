const { Router } = require("express");
const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");
const {
  addContactValidation,
} = require("../middlewares/validaationMiddleware");

const contactsPath = path.join(__dirname, "../db/contacts.json");
const router = Router();

const getContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};

const writeContacts = async (contacts) => {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

router.get("/", async (req, res) => {
  try {
    const contacts = await getContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contacts = await getContacts();
    const contact = contacts.find((contact) => contact.id === id);

    if (!contact) {
      return res.status(404).json({ message: "User was not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", addContactValidation, async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const contacts = await getContacts();
    const newContact = { id: randomUUID(), name, email, phone };

    contacts.push(newContact);
    await writeContacts(contacts);

    res.status(201).json({ newContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const contacts = await getContacts();
    const index = contacts.findIndex((contact) => contact.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "User was not found" });
    }
    const updatedContact = { ...contacts[index], ...body };
    contacts[index] = updatedContact;

    await writeContacts(contacts);
    res.status(200).json({ updatedContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contacts = await getContacts();
    const index = contacts.findIndex((contact) => contact.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "User was not found" });
    }
    const deletedContact = contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    res.status(200).json({ message: `contact with ID: ${id} was deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
