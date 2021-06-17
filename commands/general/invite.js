const Discord = require('discord.js')
const Command = require('../../base/command')

class Invite extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            aliases: [],
            category: 'general',
            disableable: false,
            memberPermissions: [],
            botPermissions: [],
        });
    }

    async execute(message, args, t) {
        const guildData = await message.client.getGuildData(message.guild.id)
        const { themeColor } = guildData
    }
}

module.exports = Invite