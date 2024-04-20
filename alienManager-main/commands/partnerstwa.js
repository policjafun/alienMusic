const { SlashCommandBuilder} = require("@discordjs/builders");
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('partnerstwa')
        .setDMPermission(false)
        .setDescription('zarządzaj')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addStringOption(option =>
            option.setName('akcja')
                .setDescription('wybierz akcje')
                .setRequired(true)
                .addChoices(
                    { name: 'pokaz', value: 'show'},
                    { name: 'tabela', value: 'lb'},
                    { name: 'clear', value: 'clear'},
                    { name: 'add', value: 'add'},
                    { name: 'remove', value: 'remove'}
            ))
        .addUserOption(option => 
            option.setName('user')
                .setDescription('user'))
        .addNumberOption(option =>
            option.setName('ilosc')
                .setDescription('ilosc')
                .setRequired(false)),
        
    execute: async (client, interaction, args, message) => {
        const akcja = interaction.options.getString('akcja')
        const osoba = interaction.options.getUser('user')
        const number = interaction.options.getNumber('ilosc')

        if(akcja == 'add') {
            if(interaction.user.id == '766271467801018369') {
                interaction.reply({ content: `<:yes:1070371658403160135> Dodano \` ${number} \` partnerstw(a) uzytkownikowi \` ${osoba.tag} \`.`})
                await db.add(`part.${osoba.id}.licz`, number)
            }
        } else if(akcja == 'remove') {
            if(interaction.user.id == '766271467801018369') {
                interaction.reply({ content: `<:yes:1070371658403160135> Usunięto \` ${number} \` partnerstw(a) uzytkownikowi \` ${osoba.tag} \`.`})
                await db.sub(`part.${osoba.id}.licz`, number)
            }
        } else if(akcja == 'show') {
            console.log(await db.get(`part`))
            user2 = osoba || interaction.user
            const partnerstwa = await db.get(`part.${user2.id}.licz`) || 0
            interaction.reply({ content: `<:yes:1070371658403160135> Liczba partnerstw: \` ${partnerstwa} \`, Uzytkownik: \` ${user2.tag} \``})
        } else if(akcja == 'lb') {
            const s = await db.get(`part`)
            let keys = Object.keys(s)
            const embed = new EmbedBuilder()
                .setDescription(`${keys.map(k => `<@${k}> - \`${s[k].licz}\``).join(`\n `)}`)
                .setColor(`FF5555`)

            interaction.reply({ embeds: [embed]})
        } else if(akcja == 'clear') {
            if(interaction.user.id == '766271467801018369') {
                await db.delete(`part`)
                interaction.reply({ content: '<:yes:1070371658403160135> Wyczyszczono wszystkie partnerstwa!'})
            }
        }

    }}