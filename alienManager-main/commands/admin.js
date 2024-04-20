const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
} = require("discord.js");
require("dotenv").config();
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("admin")
        .setDMPermission(false)
        .setDescription("Ustawienia administratorskie")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option) =>
            option
                .setName("wybierz")
                .setDescription("wybierz opcje pacanie")
                .setRequired(true)
                .addChoices(
                    { name: "punkty-add", value: "addpkt" },
                    { name: "punkty-remove", value: "removepkt" },
                    { name: "punkty-reset", value: "resetpkt" }
                )
        )
        .addUserOption((option) =>
            option.setName("uzytkownik").setDescription("wybierz uzytkownika")
        )
        .addIntegerOption((option) =>
            option.setName("ilosc").setDescription("ilosc punktow")
        ),
    execute: async (client, interaction) => {
        const wybierz = interaction.options.getString("wybierz");
        const os = interaction.options.getUser("uzytkownik");
        const ilosc = interaction.options.getInteger("ilosc");

        const embed = new EmbedBuilder()
            .setColor("FF5555")
            .setTitle('<:yes:1070371658403160135> Ustawienia administratora')
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            });
        if (wybierz == "addpkt") {
            await db.add(`pkt.${os.id}`, ilosc);
            embed.setDescription(
                `**${interaction.user.tag}** dodał \` ${ilosc} \` punktów administratorowi **${os.tag}**`
            );
        } else if (wybierz == "removepkt") {
            await db.sub(`pkt.${os.id}`, ilosc);
            embed.setDescription(
                `**${interaction.user.tag}** usunął \` ${ilosc} \` punktów administratorowi **${os.tag}**`
            );
        }
        interaction.reply({ embeds: [embed] });
    },
};
