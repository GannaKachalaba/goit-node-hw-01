const contacts = require('./contacts');
const { Command, program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();


// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
    const allUsers = await contacts.listContacts();

      console.table(allUsers);
      break;

    case "get":
    const user = await contacts.getContactById(id);

      console.log(user);
      break;

    case "add":
      const newUser = await contacts.addContact(name, email, phone);

      console.log(newUser);
      break;

    case "remove":
      const removedUser = await contacts.removeContact(id);

      console.log(removedUser);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);