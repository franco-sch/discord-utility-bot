const fs = require("fs");
const ascii = require("ascii-table");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientID, guildID, token } = require("./config.json");

function loadSlashCommands(client) {
  const table = new ascii().setHeading(" Slash Commands", "Load Status");
  const commands = [];
  const commandFiles = fs
    .readdirSync("./slash-commands")
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./slash-commands/${file}`);
    client.slashCommands.set(command.data.name, command);
    commands.push(command.data.toJSON());
    table.addRow(file, "✔️");
  }

  const rest = new REST({ version: "9" }).setToken(token);

  rest
    .put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);

  console.log(table.toString());
}

module.exports = {
  loadSlashCommands,
};
