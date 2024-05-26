const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// Funcție pentru a citi contactele
function readContacts() {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// Funcție pentru a scrie contactele
function writeContacts(contacts) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

// Funcție pentru a lista contactele
async function listContacts() {
  try {
    const contacts = await readContacts();
    console.table(contacts);
  } catch (error) {
    console.error("Eroare la listarea contactelor:", error);
  }
}

// Funcție pentru a obține un contact după ID
async function getContactById(contactId) {
  try {
    const contacts = await readContacts();
    const contact = contacts.find((c) => c.id === contactId);
    console.log(contact || "Contact nu a fost găsit");
  } catch (error) {
    console.error("Eroare la obținerea contactului:", error);
  }
}

// Funcție pentru a adăuga un contact
async function addContact(name, email, phone) {
  try {
    const contacts = await readContacts();
    const newContact = { id: contacts.length + 1, name, email, phone };
    contacts.push(newContact);
    await writeContacts(contacts);
    console.log("Contact adăugat:", newContact);
  } catch (error) {
    console.error("Eroare la adăugarea contactului:", error);
  }
}

// Funcție pentru a șterge un contact
async function removeContact(contactId) {
  try {
    const contacts = await readContacts();
    const filteredContacts = contacts.filter((c) => c.id !== contactId);
    await writeContacts(filteredContacts);
    console.log(`Contact cu id-ul ${contactId} a fost șters.`);
  } catch (error) {
    console.error("Eroare la ștergerea contactului:", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
