const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
require("dotenv").config()
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDMPermission(false)
        .setDescription('Wyslij sugestie do administracji'),
    execute: async (client, interaction) => {
        const modal = new ModalBuilder()
            .setCustomId('suggest')
            .setTitle('Wyslij sugestie!')    
            
        const pyt_1 = new TextInputBuilder()
            .setCustomId('pyt_1')
            .setLabel('Sugestia')
            .setPlaceholder('Wpisz swoją sugestie')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        
        const pyt_2 = new TextInputBuilder()
            .setCustomId('pyt_2')
            .setLabel('Opis')
            .setPlaceholder('Jak ma działać funkcja/komenda')
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)

        modal.addComponents(new ActionRowBuilder().addComponents(pyt_1), new ActionRowBuilder().addComponents(pyt_2))

        await interaction.showModal(modal)

    }
}