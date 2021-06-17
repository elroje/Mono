const Discord = require('discord.js')
const Command = require('../../base/command')

class CommandManager extends Command {
    constructor(client) {
        super(client, {
            name: 'command',
            aliases: [],
            category: 'managing',
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

module.exports = CommandManager