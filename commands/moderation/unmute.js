const Discord = require('discord.js')
const Command = require('../../base/command')

class Unmute extends Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            aliases: [],
            category: 'moderation',
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

module.exports = Unmute