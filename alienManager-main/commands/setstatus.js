const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
require("dotenv").config()
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setstatus')
    .setDMPermission(false)
    .setDescription('Ustaw status')
    .addStringOption(option => 
        option.setName('text')
            .setDescription('Text')
            .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async (client, interaction) => {

        const text = interaction.options.getString("text")
       
        await db.set("bot.status", text)

        const embed = new EmbedBuilder()
            .setColor("FF5555")
            .setDescription("<:yes:1070371658403160135> Ustawiono status bota na: **" + text + "**, dane zostaną zaktualizowane w ciągu 2 minut")

        interaction.reply({ embeds: [embed]})
    }
}