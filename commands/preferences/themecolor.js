const { MessageEmbed } = require('discord.js')
const Command = require('../../base/command')

class ThemeColor extends Command {
    constructor(client) {
        super(client, {
            name: 'themecolor',
            aliases: [],
            category: 'preferences',
            disableable: true,
            memberPermissions: ['MANAGE_GUILD'],
            botPermissions: [],
        });
    }

    async execute(message, args, t) {
        const guildData = await message.client.getGuildData(message.guild.id)
        const { themeColor } = guildData.preferences
        const availableColors =  Object.keys(message.client.config.colors)

        if(!args[0]) {
            const embed = new MessageEmbed()
                .setColor(themeColor || message.client.defaultColor)
                .setTitle(t('chooseColorTitle'))
                .setDescription(t('chooseColorDescription'))
                .addField(
                    t('availableColors'),
                    availableColors.map(
                        color => `${message.client.cEmojis.color[color]} \`${color}\``
                    )
                )

            message.channel.send(embed)
        }

        if(message.client.regex.hexColor.test(args[0])) {
            let color = args[0]
            if(color.startsWith('#')) color = color.substring(1)

            if (color.length === 3) {
                color = color.split('').map(hex => hex + hex).join('');
            }

            if(color.toUpperCase() === 'FFFFFF') color = 'FEFEFE'
            if(color.toUpperCase() === '000000') color = '010101'

            await message.client.updateGuildData(message.guild.id, { preferences: { themeColor: '#' + color } })
            return message.channel.success(t('colorChanged'))
        }

        if(availableColors.includes(args[0].toLowerCase())) {
            const color = message.client.config.colors[args[0].toLowerCase()]

            await message.client.updateGuildData(message.guild.id, { preferences: { themeColor: color } })
            return message.channel.success(t('colorChanged'))
        }

        return message.channel.error(t('colorNotFound'))
    }
}

module.exports = ThemeColor