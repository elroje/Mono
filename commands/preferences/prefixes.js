const Discord = require('discord.js')
const Command = require('../../base/command')

class Prefixes extends Command {
    constructor(client) {
        super(client, {
            name: 'prefixes',
            aliases: [],
            category: 'preferences',
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

module.exports = Prefixes