const Discord = require('discord.js')
const Command = require('../../base/command')

class Reload extends Command {
    constructor(client) {
        super(client, {
            name: 'reload',
            aliases: [],
            category: 'owner',
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

module.exports = Reload