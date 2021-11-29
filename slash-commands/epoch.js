const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("epoch")
    .setDescription("Convert a date in seconds from epoch to date")
    .addIntegerOption((option) =>
      option.setName("epoch").setDescription("date in seconds from epoch")
    ),

  async execute(interaction) {
    const epochDate = interaction.options.getInteger("epoch");
    const date = new Date(epochDate * 1000);
    return interaction.reply(
      `GMT Date: \t${date.toUTCString()}\nLocal Date:\t${date.toLocaleString()}`
    );
  },
};
