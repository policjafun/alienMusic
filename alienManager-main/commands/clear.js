const { SlashCommandBuilder} = require("@discordjs/builders");
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDMPermission(false)
        .setDescription('wyczysc daną liczbe wiadomosci')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addNumberOption(option => 
            option.setName('liczba')
                .setDescription('liczbe podaj')
                .setRequired(true)),
        
    execute: async (client, interaction, args, message) => {
    const number = interaction.options.getNumber("liczba") 
    const permission = interaction.member.permissions.has("ManageMessages");

    if (number > 100 || number <= 1) {  
        interaction.reply({
            content: 'Liczba musi być większa niz ` 1 ` i mniejsza niz ` 100 `.', ephemeral: true
        })
    } else {
        interaction.channel.bulkDelete(number, true)


    const embed = new EmbedBuilder()
        .setColor("FF5555")
        .setDescription(`<:yes:1070371658403160135> Usunięte wiadomości: ${String(number)}\nModerator: ${interaction.member}`)
  
    interaction.reply({
        embeds: [embed]
        })  
    }}
}