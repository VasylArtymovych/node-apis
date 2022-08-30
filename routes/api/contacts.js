const express = require("express");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../controllers/contactsController");
const {
  validateAddContactFields,
  validateUpdateContactFields,
} = require("../../middlewares/validationMiddleware");
const { collectionMiddleware } = require("../../middlewares/models");
const { controllerWraper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.use(collectionMiddleware);

router.get("/", controllerWraper(listContacts));

router.get("/:contactId", controllerWraper(getById));

router.post("/", validateAddContactFields, controllerWraper(addContact));

router.delete("/:contactId", controllerWraper(removeContact));

router.put(
  "/:contactId",
  validateUpdateContactFields,
  controllerWraper(updateContact)
);

module.exports = router;
