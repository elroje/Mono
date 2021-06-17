const { MessageEmbed } = require('discord.js')
const Command = require('../../base/command')
const { BitlyClient } = require('bitly')
const bitly = new BitlyClient(process.env.BITLY_TOKEN)

class Bitly extends Command {
    constructor(client) {
        super(client, {
            name: 'bitly',
            aliases: ['shorten'],
            category: 'utilities',
            disableable: true,
            memberPermissions: [],
            botPermissions: [],
        });
    }

    async execute(message, args, t) {
        const guildData = await message.client.getGuildData(message.guild.id)
        const { themeColor } = guildData

        if(!args[0]) return message.channel.error(t('e:noURLProvided'))

        if(!message.client.regex.url.test(args[0])) return message.channel.error(t('e:invalidURL'))

        let inputLink = args[0]

        if(!message.client.regex.urlWithProtocol.test(inputLink)) inputLink = 'https://' + inputLink

        try {
            const { link } = await bitly.shorten(inputLink)

            message.channel.success(t('success', {
                shortenLink: link
            }))
        } catch (e) {
            if(!link) return message.channel.error(t('e:errorOccurred'))
        }
    }
}

module.exports = Bitly