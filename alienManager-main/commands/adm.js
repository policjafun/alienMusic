const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();


module.exports = {
    data: new SlashCommandBuilder()
        .setName('adm')
        .setDescription('Pokazuje panel administratora')
        .setDMPermission(false)
        .addUserOption(option =>
            option.setName('uzytkownik')
                .setDescription('Wybierz uzytkownika'))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    execute: async (client, interaction) => {
        const os = interaction.options.getUser('uzytkownik') || interaction.user;


        let ranga;
        if(await db.get(`pkt.${os}`) > 10) {
            ranga = 'Wkrótce awans!'
        } else if(await db.get(`pkt.${os.id}`) < 10) {
            ranga = 'Stabilnie'
        } else if(await db.get(`pkt.${os.id}`) > 20) {
            ranga = 'Awans!!'
        } else if(await db.get(`pkt.${os.id}`) < 4) {
            ranga = 'Słabo'
        } else if(await db.get(`pkt.${os.id}`) == 0) {
            ranga = 'Degrad!'
        }

        const embed = new EmbedBuilder()
            .setColor('FF5555')
            .setAuthor({name: os.tag, iconURL: os.displayAvatarURL({dynamic: true})})
            .addFields([
                { name: 'Wiadomości', value: `\` ${await db.get(`admin.${os.id}.msgs`) || 0}/500 \``},
                { name: 'Punkty', value: `\` ${await db.get(`pkt.${os.id}`) || 0} \``},
                { name: 'Ranga', value: `${ranga || 'Napotkałem problem...'}`}
            ])
        interaction.reply({ embeds: [embed] })
    }
}