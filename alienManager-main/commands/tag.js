const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
require("dotenv").config()
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tag')
        .setDMPermission(false)
        .setDescription('tagi')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName('tag')
                .setDescription('tag')
                .setRequired(true)
                .addChoices(
                    { name: 'partnerstwa', value: 'partnerstwa'},
                    { name: 'wzór', value: 'wzór'}
                )
        ),
    execute: async (client, interaction) => {
        const option = interaction.options.getString('tag')

        const embed = new EmbedBuilder()
            .setColor('FF5555')
            .setTitle('<:lampka:1070371665550258186> Tag: `' + option + '`')

        if(option == 'partnerstwa') {
            embed.setDescription(' 1. Aktywność  - Twój serwer musi być aktywny, z regularnymi aktywnościami członków. Ważne jest, aby Twój serwer był aktywny w sposób ciągły, aby uwiarygodnić swoją wartość jako partnera.\n2. Treść  - Twój serwer musi mieć odpowiednią treść, która odpowiada kulturze Discorda. Serwery, które promują negatywne treści, nie będą akceptowane.\n3. Brak naruszeń  - Twój serwer nie może naruszać zasad Discorda, w tym zasad dotyczących zachowania się na serwerach partnerskich.\n4. Własny link  - Twój serwer musi mieć własny link, a nie link do zaproszenia tymczasowego lub przeterminowanego.\n5. Wiarygodność  - Ważne jest, aby Twój serwer był uważany za wiarygodny i zaufany przez społeczność Discorda.\nProfesjonalizm  - Twój serwer powinien wyglądać profesjonalnie i być łatwy do nawigacji. Ważne jest, aby Twój serwer był łatwy w obsłudze i zrozumiały dla nowych użytkowników. ')

            interaction.reply({ embeds: [embed] })
        } else if(option == 'wzór') {
            embed.setDescription('1. Jesteś w administracji innego bota?\n2. Znasz regulamin (1/10)?\n3. Ile masz lat?\n4. Jakie masz doświadczenie z tą rangą?\n5. Na ile znasz naszego bota? (1/10)\n6. Opisz swoje zainteresowania:')

            interaction.reply({ embeds: [embed] })
        }
    
    }
}