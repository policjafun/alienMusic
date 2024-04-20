const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
require("dotenv").config()
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDMPermission(false)
        .setDescription('Blokuje kanał')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async (client, interaction) => {

        const embed = new EmbedBuilder()
            .setTitle(`<:yes:1070371658403160135> Kanał został zablokowany!`)
            .setDescription(`Kanał został zablokowany przez \` ${interaction.user.tag} \``)
            .setColor(`FF5555`)
            .setTimestamp()


        
        interaction.reply({ embeds: [embed] })


        if(db.get(`lock.${interaction.channel.id}`) == true || undefined) {
            await db.set(`lock.${interaction.channel.id}`, true)
            await interaction.channel.edit({
                permissionOverwrites: [
                {
                    id: "1094624430354858125",
                    deny: [
                        PermissionFlagsBits.SendMessages,
                    ],
                }
            ]})
        } else if(db.get(`lock.${interaction.channel.id}`) == true) {
            await db.set(`lock.${interaction.channel.id}`, false)
            await interaction.channel.edit({
                permissionOverwrites: [
                {
                    id: "1094624430354858125",
                    allow: [
                        PermissionFlagsBits.SendMessages,
                    ],
                }
            ]})
        }

        





    
    }
}