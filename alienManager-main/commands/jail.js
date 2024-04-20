const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("jail")
        .setDMPermission(false)
        .setDescription("wyslij kogos do wiezenia")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName('wybierz')
                .setDescription('wybierz')
                .setRequired(true)
                .addChoices(
                    { name: 'add', value: 'add' },
                    { name: 'remove', value: 'remove' }
                ))
        .addUserOption(option =>
            option.setName("member")
                .setDescription("choose a member")
                .setRequired(true)),

    execute: async (client, interaction) => {

        const os = interaction.options.getMember("member")
        const select = interaction.options.getString("wybierz")
        const rola = interaction.guild.roles.cache.find(r => r.name === 'Jail');
        const user = interaction.guild.roles.cache.find(r => r.id === '1094624430354858125')

        const embed = new EmbedBuilder()
            .setColor("FF5555")
            .setDescription(`Moderator: <@` + interaction.user.id + `>\nOsoba: <@` + os.id + `>`)
            .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({dynamic: true})})

            if(select == 'add') {
                console.log('1')
                os.roles.add(rola)
                os.roles.remove(user)
                embed.setTitle("<:yes:1070371658403160135> Wysłano użytkownika do więzenia")
                interaction.reply({ embeds: [embed] })
            } else if(select == 'remove') {
                embed.setTitle("<:yes:1070371658403160135> Usunięto użytkownika z więzienia")
                os.roles.remove(rola)
                os.roles.add(user)
                interaction.reply({ embeds: [embed] })
            }
        
        
    }
}