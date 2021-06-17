const { MessageEmbed } = require('discord.js')
const Command = require('../../base/command')
const moment = require('moment')

class User extends Command {
    constructor(client) {
        super(client, {
            name: 'user',
            aliases: ['userinfo', 'member', 'memberinfo', 'whois'],
            category: 'information',
            disableable: true,
            memberPermissions: [],
            botPermissions: ['SEND_MESSAGES'],
        });
    }

    async execute(message, args, t) {
        const guildData = await message.client.getGuildData(message.guild.id)
        const { themeColor } = guildData

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

        const avatarExtensions = ['webp', 'png', 'jpg', 'jpeg']
        // Add gif extension if avatar is animated
        if(member.user.displayAvatarURL({ dynamic: true }).endsWith('.gif')) avatarExtensions.push('gif')

        const embed = new MessageEmbed()
            .setColor(themeColor || message.client.defaultColor)
            .setTitle(member.user.tag)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addField(
                t('common/id'),
                `\`${member.user.id}\``,
                true
            )
            .addField(
                t('accountCreated'),
                moment(member.user.createdTimestamp).calendar(),
                true
            )
            .addField(
                t('joinedGuild'),
                moment(member.joinedTimestamp).calendar(),
                true
            )
            .addField(
                t('avatar'),
                avatarExtensions.map((e) => `[${e}](${member.user.displayAvatarURL({ format: e })})`).join(', '),
                true
            )
            .addField(
                t('permissions'),
                member.permissions.toArray().includes('ADMINISTRATOR') ?
                    `\`${t(`common/permissions.ADMINISTRATOR`)}\`` :
                    member.permissions.toArray()
                        .filter(n => !message.guild.roles.everyone.permissions.toArray().includes(n))
                        .map(p => `\`${t(`common/permissions.${p}`)}\``)
                        .join(', '),
                true
            )

        message.channel.send({ embeds: [embed] })
    }
}

module.exports = User