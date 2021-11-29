const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json");
const { loadEvents } = require("./loadEvents");
const { loadSlashCommands } = require("./loadSlashCommands");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.slashCommands = new Collection();

loadSlashCommands(client);
loadEvents(client);


client.login(token);
