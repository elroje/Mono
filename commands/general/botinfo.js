const { MessageEmbed } = require('discord.js')
const config = require('../../config')
const { getSafe } = require("../../utils");
const Command = require('../../base/command')

class BotInfo extends Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            aliases: [],
            category: 'general',
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

module.exports = BotInfo