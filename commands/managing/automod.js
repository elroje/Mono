const Discord = require('discord.js')
const Command = require('../../base/command')

class Automod extends Command {
    constructor(client) {
        super(client, {
            name: 'automod',
            aliases: ['automoderation'],
            category: 'managing',
            disableable: true,
            memberPermissions: [],
            botPermissions: [],
        });
    }

    async execute(message, args, t) {
        const guildData = await message.client.getGuildData(message.guild.id)
        const { themeColor } = guildData
    }
}

module.exports = Automod