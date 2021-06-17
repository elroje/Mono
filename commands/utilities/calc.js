const { MessageEmbed } = require('discord.js')
const Command = require('../../base/command')
const math = require('mathjs')
const { codeScope } = require('../../utils')

class Calc extends Command {
    constructor(client) {
        super(client, {
            name: 'calc',
            aliases: ['calculate', 'math'],
            category: 'utilities',
            disableable: true,
        });
    }

    async execute(message, args, t) {
        const guildData = await message.client.getGuildData(message.guild.id)
        const { themeColor } = guildData


        if(!args[0]) {
            const noExpEmbed = new MessageEmbed()
                .setColor(themeColor || message.client.defaultColor)
                .setDescription(t('noExpression'))

            return message.channel.send({ embeds: [noExpEmbed] })
        }

        try {
            const result = math.evaluate(args.join(' '))

            const resultEmbed = new MessageEmbed()
                .setColor(themeColor || message.client.defaultColor)
                .addField(t('expression'), codeScope(args.join(' ')))
                .addField(t('result'), codeScope(result))

            message.channel.send({ embeds: [resultEmbed] })
        } catch (e) {
            return message.channel.error(t('e:invalidExpression'))
        }
    }
}

module.exports = Calc