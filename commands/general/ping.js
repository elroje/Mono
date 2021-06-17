const { MessageEmbed } = require('discord.js')
const Command = require('../../base/command')

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: [],
            category: 'general',
            disableable: true,
            memberPermissions: [],
            botPermissions: [],
        });
    }

    async execute(message, args, t) {
        const guildData = await message.client.getGuildData(message.guild.id)
        const { themeColor } = guildData

        const pingEmbed = new MessageEmbed()
            .setColor(themeColor || message.client.defaultColor)
            .setDescription(t('pinging'))

        const msg = await message.channel.send({ embeds: [pingEmbed] })

        const ping = msg.createdTimestamp - message.createdTimestamp

        const pongEmbed = new MessageEmbed()
            .setColor(themeColor || message.client.defaultColor)
            .setDescription(t('pong', {
                ping: ping
            }))

        msg.edit({ embeds: [pongEmbed] })
    }
}

module.exports = Ping