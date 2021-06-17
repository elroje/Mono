const Discord = require('discord.js')
const Command = require('../../base/command')

class Emoji extends Command {
    constructor(client) {
        super(client, {
            name: 'emoji',
            aliases: [],
            category: 'information',
            disableable: true,
            memberPermissions: [],
            botPermissions: [],
            hidden: true
        });
    }

    async execute(message, args, t) {
        const guildData = await message.client.getGuildData(message.guild.id)
        const { themeColor } = guildData
    }
}

module.exports = Emoji