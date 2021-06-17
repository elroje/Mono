const { MessageEmbed } = require('discord.js')
const Command = require('../../base/command')

class Eval extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            aliases: [],
            category: 'owner',
            disableable: true,
            ownerOnly: true,
            memberPermissions: [],
            botPermissions: [],
        });
    }

    async execute(message, args, t) {
        const guildData = await message.client.getGuildData(message.guild.id)
        const { themeColor } = guildData

        const code = args.join(' ')

        eval(code)
    }
}

module.exports = Eval