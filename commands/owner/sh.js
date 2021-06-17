const { MessageEmbed } = require('discord.js')
const Command = require('../../base/command')
const { exec } = require('child_process')

class Eval extends Command {
    constructor(client) {
        super(client, {
            name: 'sh',
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

        exec(code,
            (error, stdout, stderr) => {
                message.channel.success('```' + stdout + '```')
                console.log(stderr);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });
    }
}

module.exports = Eval