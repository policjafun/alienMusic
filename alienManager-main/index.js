const {
    Client,
    GatewayIntentBits,
    ActivityType,
    ChannelType,
    PermissionFlagsBits,
    EmbedBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
    Embed,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    IntegrationExpireBehavior,
} = require("discord.js");
const chalk = require("chalk-v2");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const fs = require("fs");
const config = require("./config.js");
const internal = require("stream");
const { error } = require("console");
require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ],
});

client.on("ready", async () => {
    process.on('unhandledRejection', (error) => {

        client.guilds.cache.get('1094622975438880888').channels.cache.get('1098252260296900760').send({ content: `Problem jest (unhandledRejection): \`\`\`${error}\`\`\``}) 
    })
    process.on('uncaughtException', (error) => {

        client.guilds.cache.get('1094622975438880888').channels.cache.get('1098252260296900760').send({ content: `Problem jest (uncaughtException): \`\`\`${error}\`\`\``}) 
    })




    console.log("Jestem online!");
    setInterval(async () => {
        client.user.setPresence({
            activities: [
                {
                    name: `${
                        (await db.get("bot.status"))
                            ? await db.get("bot.status")
                            : "🎵 alienMusic"
                    }`,
                    type: ActivityType.Watching,
                },
            ],
            status: "online",
        });
    }, 5 * 1000);
    require("./commandHandlers.js").execute(client);
});

client.on("guildMemberAdd", async (guildMember) => {
    guildMember.guild.channels.cache.get("1097523240903114784").send({
        content: `<@${guildMember.id}> dolaczyl do serwera\n\n${guildMember.guild.memberCount} juz ludziów ess`,
    });
});

client.on("guildMemberRemove", async (guildMember) => {
    guildMember.guild.channels.cache.get("1097523240903114784").send({
        content: `<@${guildMember.id}> wyszedl z serwera\n\n${guildMember.guild.memberCount} juz ludziów ess`,
    });
});





client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand) return;

    if (interaction.isChatInputCommand()) {
        const command = fs.readFileSync(
            `./commands/${interaction.commandName}.js`,
            "utf8"
        );
        if (command) {
            const cmd = require(`./commands/${interaction.commandName}.js`);
            if (cmd.dev && !config.devs.includes(interaction.user.id)) {
                return interaction.reply({
                    content:
                        "❌ Ta komenda jest dostępna tylko dla developerów",
                    ephemeral: true,
                });
            }
            require(`./commands/${interaction.commandName}`).execute(
                client,
                interaction
            );
        }
    }
});





//event that makes another voice channel with users name when someone joins a voice channel
client.on("voiceStateUpdate", async (oldState, newState) => {
    client.guilds.cache.get('1094622975438880888').channels.cache.get('1097916644023619685').send({ content: `test`}) 
    if (oldState.channelId == newState.channelId) return;
    if (oldState.channelId == "1094624312696250418") {
        const channel = await newState.guild.channels.create({
                name: `${newState.member.user.username}`,
                type: ChannelType.GuildVoice,
                parent: "1094623092640317531",
                permissionOverwrites: [
                    {
                        id: newState.guild.id,
                        deny: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.Connect,
                        ],
                    },
                    {
                        id: newState.member.user.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.Connect,
                        ],
                    },
                ],

                userLimit: 1,
            }
        );
        newState.setChannel(channel);
    } else {
        if (oldState.channel.members.size == 0) {
            oldState.channel.delete();
        }   
    }
});





client.on("messageCreate", async (interaction, message) => {
    if (interaction.member.roles.cache.has("1094624428840730704")) {
        await db.add(`admin.${interaction.author.id}.msgs`, 1);
        
    }
});

client.on("messageUpdate", async (oldmessage, newmessage) => {
    if (oldmessage.content == newmessage.content) return;
    if (oldmessage.author.id == "1069665438688092210", "1067159466811867266") return;
    const embed = new EmbedBuilder()
        .setTitle("Edytowano wiadomość!")
        .setDescription(`Autor: **${oldmessage.author.tag}**`)
        .setFields([
            {
                name: "Stara wiadomość: ",
                value: "```" + oldmessage.content + "```",
            },
            {
                name: "Nowa wiadomość: ",
                value: "```" + newmessage.content + "```",
            },
        ]);
        client.guilds.cache.get('1094622975438880888').channels.cache.get('1097760479792857138').send({ embeds: [embed] })
});

client.on("messageCreate", async (interaction, message) => {
    if (interaction.channel.id == "1099019376553894061") {
        if (interaction.author.id != "1069665438688092210") {
            await db.add(`part.${interaction.author.id}.licz`, 1);
            const partnerstwa = await db.get(
                `part.${interaction.author.id}.licz`
            );
            const embed = new EmbedBuilder()
                .setTitle("Nowe partnerstwo!")
                .setColor(`FF5555`)
                .setFields([
                    { name: "Realizator", value: `${interaction.author.tag}` },
                    { name: "Twoje partnerstwa:", value: `\`${partnerstwa}\`` },
                ]);
            interaction.channel.send({
                content: `<@${interaction.author.id}>`,
                embeds: [embed],
            });
        }
    }
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton) return;

    if (interaction.customId == "verify") {
        interaction.member.roles.add("1094624430354858125");
        interaction.reply({ content: "Zweryfikowałeś się!", ephemeral: true });
    } else if (interaction.customId == "ticket_open") {
        interaction.guild.channels.cache.get('1099431586904162505').send({ content: `\`\`\`diff\n+ ${interaction.user.tag} otworzył ticket!\`\`\``})
        interaction.reply({ content: "Stworzno ticket!", ephemeral: true });
        await interaction.guild.channels.create({
            name: "ticket-" + interaction.user.id,
            type: ChannelType.GuildText,
            parent: "1094623147195641898", //id kategori w ktorej ma byc tworzony ticket
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: "1094624428840730704", //tutaj wpisac id roli administracyjnej, pomocnik czy cos
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                    ],
                },
                {
                    id: interaction.user.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                    ],
                },
            ],
        });

        const embed = new EmbedBuilder()
            .setColor("FF5555")
            .setTitle(`Ticket`)
            .setDescription(
                "Opisz administracji problem!\nPamiętaj aby być cierpliwym"
            );

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("ticket_close")
                .setLabel("Zamknij ticket")
                .setStyle(ButtonStyle.Danger)
        );

        const channel = interaction.guild.channels.cache.find(
            (channel) => channel.name == "ticket-" + interaction.user.id
        );
        channel.send({ embeds: [embed], components: [row] });
    } else if (interaction.customId == "ticket_close") {
        interaction.guild.channels.cache.get('1099431586904162505').send({ content: `\`\`\`diff\n- ${interaction.user.tag} zamknął ticket (${interaction.channel.name})!\`\`\``})
        interaction.reply({ content: "Zamykam ticket..." });
        interaction.channel.delete();
    } else if(interaction.customId == "suggest") {
        const pomysl = interaction.fields.getTextInputValue("pyt_1")
        const opis = interaction.fields.getTextInputValue("pyt_2")

        const embed = new EmbedBuilder()
            .setTitle("Nowy pomysł!")
            .setColor("FF5555")
            .setFields([
                { name: "Autor", value: `${interaction.user.tag}` },
                { name: "Pomysł", value: `${pomysl}` },
                { name: "Opis", value: `${opis}` },
            ]);

        interaction.guild.channels.cache.get('1102587286220197888').send({ embeds: [embed] })
        interaction.reply({ content: "Wysłano pomysł!", ephemeral: true });
    }

});

client.login(process.env.TOKEN);
