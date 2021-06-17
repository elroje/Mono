const Discord = require('discord.js')
const Command = require('../../base/command')

class Mute extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
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

module.exports = Mute