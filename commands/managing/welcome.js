const Discord = require('discord.js')
const Command = require('../../base/command')

class Welcome extends Command {
    constructor(client) {
        super(client, {
            name: 'welcome',
            aliases: [],
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

module.exports = Welcome