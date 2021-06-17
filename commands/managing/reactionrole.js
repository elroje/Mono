const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const Command = require('../../base/command')

class ReactionRole extends Command {
    constructor(client) {
        super(client, {
            name: 'reactionrole',
            aliases: ['reactionroles', 'reactroles', 'reactrole', 'rr'],
            category: 'managing',
            disableable: true,
            memberPermissions: ['MANAGE_ROLES'],
            botPermissions: ['MANAGE_ROLES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY'],
        });
    }

    async execute(message, args, t) {
        const guildData = await message.client.getGuildData(message.guild.id)
        const { themeColor } = guildData

        const menuEmbed = new MessageEmbed()
            .setColor(themeColor || message.client.defaultColor)
            .setTitle(t('reactionRoles'))
            .setDescription(t('reactionRolesDescription'))

        const selectChannelEmbed = new MessageEmbed()
            .setColor(themeColor || message.client.defaultColor)
            .setTitle(t('creatingReactionRoleMessage'))
            .setDescription(t('selectChannel'))

        const selectMessageEmbed = new MessageEmbed()
            .setColor(themeColor || message.client.defaultColor)
            .setTitle(t('creatingReactionRoleMessage'))
            .setDescription(t('selectMessage'))

        const msg = await message.channel.send({
            embeds: [menuEmbed]
        })

        await msg.react(message.client.cEmojis.num[1])
        await msg.react(message.client.cEmojis.num[2])

        const filter = (r, user) => {
            return ['839239643034943509', '839239642997194762'].includes(r.emoji.id) && user.id === message.author.id
        }
        const collected = await msg.awaitReactions(filter, { max: 1, time: 20 * 1000, errors: ['time'] })

        await msg.reactions.removeAll()

        // New message
        if(collected.first().emoji.id === '839239643034943509') {
            await msg.edit({ embeds: [selectChannelEmbed] })

            const channel = (await message.channel.awaitMessages(
                (m) => m.author.id === message.author.id && message.mentions.channels.size > 0,
                { max: 1, time: 5 * 1000, errors: ['time'] }
            )).first().mentions.channels.first()
    
            message.channel.send(channel)
        }
    }
}

module.exports = ReactionRole