const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

let lastContactId = 0;

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const currentContact = contacts.find((item) => item.id === String(contactId));
  return currentContact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const updatedContacts = contacts.findIndex((item) => item.id === contactId);
  if (updatedContacts === -1) {
    return null;
  }

  const [removeContact] = contacts.splice(updatedContacts, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: ++lastContactId, name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
