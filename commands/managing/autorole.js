const { MessageEmbed } = require('discord.js')
const Command = require('../../base/command')

class AutoRole extends Command {
    constructor(client) {
        super(client, {
            name: 'autorole',
            aliases: ['ar'],
            category: 'managing',
            disableable: true,
            memberPermissions: [],
            botPermissions: [],
        });
    }

    async execute(message, args, t) {
        const guildData = await message.client.getGuildData(message.guild.id)
        const { themeColor } = guildData

        const autoroleId = guildData.autorole
        const autorole = autoroleId ? await message.guild.roles.fetch(autoroleId) : null

        const infoEmbed = new MessageEmbed()
            .setColor(themeColor || message.client.defaultColor)
            .setTitle(t('autorole'))
            .setDescription(`${autoroleId ? t('currentAutoRole', { autorole }) : t('noAutoRole')}\n\n${t('usage')}`)

        if(!args[0]) {
            message.channel.send({ embeds: [infoEmbed] })
        }

        // Set role if provided
        if(message.mentions.roles && args[0] !== '@everyone') {
            const newAutorole = message.mentions.roles.first()

            if(newAutorole.managed) {
                message.channel.error(t('managedRole'))
                return
            }

            if(!newAutorole.editable) {
                message.channel.error(t('cantAccessRole'))
                return
            }

            message.client.updateGuildData(message.guild.id, { autorole: newAutorole.id })
            message.channel.success('done')
        }
    }
}

module.exports = AutoRole