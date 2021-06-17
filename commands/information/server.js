const { MessageEmbed } = require('discord.js')
const Command = require('../../base/command')
const moment = require('moment')

class Server extends Command {
    constructor(client) {
        super(client, {
            name: 'server',
            aliases: ['guild', 'serverinfo', 'guildinfo'],
            category: 'information',
            disableable: true,
            memberPermissions: [],
            botPermissions: [],
        });
    }

    async execute(message, args, t) {
        const guildData = await message.client.getGuildData(message.guild.id)
        const { themeColor } = guildData
        const { cEmojis } = message.client

        const guild = message.guild
        const members = guild.members.cache

        const embed = new MessageEmbed()
            .setColor(themeColor || message.client.defaultColor)
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL({dynamic: true}))
            .addField(
                t('owner'),
                (await message.client.users.fetch(guild.ownerID)).tag,
                true
            )
            .addField(
                t('members'),
                `${members.size} ${cEmojis.user} (${members.filter(m => m.user.bot).size} ${cEmojis.bot})`,
                true
            )
            .addField(
                t('created'),
                moment(guild.createdTimestamp).calendar(),
                true
            )
            .addField(
                t('common/id'),
                `\`${guild.id}\``,
                true
            )

        message.channel.send({ embeds: [embed] })
    }
}

module.exports = Server