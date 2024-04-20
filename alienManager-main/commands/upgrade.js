const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { exec } = require("child_process")


module.exports = {
    data: new SlashCommandBuilder()
        .setName('upgrade')
        .setDMPermission(false)
        .setDescription('restartuje bota itp.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async (client, interaction) => {
        interaction.reply({ content: `Aktualizowanie bota...`})
        exec("git pull", (error, stdout) => {
            let res = (error || stdout);
            if(error) return interaction.editReply({ content: `Coś poszlo nie tak:\n\n${error}`})
        interaction.editReply({ content: `<:yes:1070371658403160135> Zaktualizowano bota:\n\n\`\`\`${res}\`\`\``})
        return exec("pm2 restart 0", (error, stdout) => {})
        
    })
}
}