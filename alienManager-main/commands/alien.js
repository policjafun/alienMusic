const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle,} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setName("alien")
        .setDescription("ustawienia")
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName("tryb")
                .setDescription("tryb")
                .setRequired(true)
                .addChoices(
                    { name: "ticket msg", value: "ticket-msg" },
                    { name: "regulamin", value: "regulamin" },
                    { name: "weryfikacja msg", value: "verify-msg" }
                )
        )
        .addChannelOption((option) =>
            option.setName("kanal").setDescription("kanal").setRequired(true)
        ),

    execute: async (client, interaction) => {
        const cos = interaction.options.getString("tryb");
        const kanal = interaction.options.getChannel("kanal");

        const embed = new EmbedBuilder()
            .setColor("#FF5555");

        if (cos == "ticket-msg") {
            embed.setTitle("Zgłoszenie");
            embed.setImage("https://media.discordapp.net/attachments/1068279765120860291/1099297809116696677/am.png?width=1005&height=335")
            embed.setDescription(
                "Jeśli masz problem, lub pytanie do administracji, stwórz ticket\nklikając przycisk pod wiadomością"
            );
            const ticket = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Danger)
                        .setLabel("Stwórz zgłoszenie")
                        .setCustomId("ticket_open")
                );

            interaction.reply({
                content: "Wysłano wiadomość na kanal",
                ephemeral: true,
            });
            kanal.send({ embeds: [embed], components: [ticket] });
        } else if (cos == "verify-msg") {
            embed.setDescription("Kliknij przycisk aby sie zweryfikować");
            embed.setImage("https://media.discordapp.net/attachments/1068279765120860291/1099297809750036540/ve.png?width=1005&height=335")
            const verify = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Danger)
                        .setLabel("Zweryfikuj się")
                        .setCustomId("verify")
                );

            interaction.reply({
                content: "Wysłano wiadomość na kanal",
                ephemeral: true,
            });
            kanal.send({ embeds: [embed], components: [verify] });
        } else if (cos == 'regulamin') {
            interaction.reply({
                content: "Wysłano wiadomość na kanal",
                ephemeral: true,
            });

            embed.setImage(
                "https://media.discordapp.net/attachments/1068279765120860291/1099297808575643660/ru.png?width=1005&height=335"
            );
            embed.setDescription(
                "Autorski regulamin który powinien znać każdy użytkownik serwera, za złamanie regulaminu grozi kara którą wymierza członek administracji aktywny na serwerze."
            );
            embed.setFields([
                {
                    name: "` 1 ` Bez przejawów agresji",
                    value: "Wszyscy użytkownicy serwera powinni traktować się nawzajem z szacunkiem i nie stosować przemocy słownej ani fizycznej.",
                },
                {
                    name: "` 2 ` Niezwłoczne zgłaszanie naruszeń",
                    value: "Jeśli zaobserwujesz na serwerze naruszenie regulaminu, natychmiast zgłoś to moderacji.",
                },
                {
                    name: "` 3 ` Brak nieodpowiednich treści",
                    value: "Nie wolno zamieszczać na serwerze materiałów o charakterze pornograficznym, rasistowskim, przemocowym, agresywnym, itp.",
                },
                {
                    name: "` 4 ` Nieudostępnianie prywatnych informacji",
                    value: "Nie wolno publikować prywatnych danych innych użytkowników bez ich zgody.",
                },
                {
                    name: "` 5 ` Bez udziału w nielegalnych działaniach",
                    value: "Na serwerze nie wolno organizować działań sprzecznych z prawem.",
                },
                {
                    name: "` 6 ` Ochrona prywatności",
                    value: "Użytkownicy nie powinni pytać o prywatne informacje innych użytkowników i nie udostępniać swoich prywatnych danych.",
                },
                {
                    name: "` 7 ` Zachowanie spokoju",
                    value: "Nie wolno prowokować i przeszkadzać innym użytkownikom w korzystaniu z serwera.",
                },
                {
                    name: "` 8 ` Bez spamu",
                    value: "Nie wolno powtarzać wiadomości, wysyłać dużej liczby wiadomości lub zasypywać serwera niepotrzebnymi wiadomościami.",
                },
                {
                    name: "` 9 ` Nieodpowiednie korzystanie z chatu",
                    value: "Korzystanie z czatu w sposób intencjonalnie nieczytelny (m.in. przez użycie wielkich liter, emotikon, itp.) - może skutkować ostrzeżeniem lub karą.",
                },
                {
                    name: "` 10 ` Nie podszywaj się!",
                    value: "Zabronione jest podszywanie się pod innych użytkowników serwera.",
                },
            ]);

            kanal.send({ embeds: [embed] });
        }
    },
};
