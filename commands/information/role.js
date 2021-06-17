const { MessageEmbed } = require('discord.js')
const config = require('../../config')
const dedent = require('dedent')
const { getSafe } = require("../../utils");
const Command = require('../../base/command')
const moment = require('moment')

// Get color info function
const namedColors = require('color-name-list');
const nearestColor = require('nearest-color');
const colors = namedColors.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {});
const nearest = nearestColor.from(colors);

class Role extends Command {
    constructor(client) {
        super(client, {
            name: 'role',
            aliases: ['roles'],
            category: 'information',
            disableable: true,
            memberPermissions: ['MANAGE_ROLES'],
            botPermissions: ['MANAGE_ROLES'],
        });
    }

    async execute(message, args, t) {
        const guildData = await message.client.getGuildData(message.guild.id)
        const { themeColor } = guildData.preferences
        const { cEmojis } = message.client

        if (!args[0]) {
            const embed = new MessageEmbed()
                .setColor(themeColor || message.client.defaultColor)
                .setTitle(t('roleListTitle', {
                    guildName: message.guild.name,
                    quantity: message.channel.guild.roles.cache.size
                }))
                .setDescription(
                    message.channel.guild.roles.cache
                        .sort((a, b) => b.position - a.position)
                        .map((role) => role)
                        .join(', ')
                )
                .setFooter(t('roleListFooter'))

            return message.channel.send({ embeds: [embed] })
        }

        const role = message.mentions.roles.first()

        if (!role) return

        const embed = new MessageEmbed()
            .setColor(themeColor || message.client.defaultColor)
            .setTitle(t('roleInfoTitle', {
                roleName: role.name,
            }))
            .addField(
                t('common/id'),
                `\`${role.id}\``,
                true
            )
            .addField(
                t('common/color'),
                role.color === 0
                    ? t('common/none')
                    : `${nearest(role.hexColor).name}\n\`${role.hexColor.toUpperCase()}\``,
                true
            )
            .addField(
                t('position'),
                role.position.toString(),
                true
            )
            .addField(
                t('hoist'),
                role.hoist ? `${cEmojis.success} ${t('common/yes')}` : `${cEmojis.error} ${t('common/no')}`,
                true
            )
            .addField(
                t('mentionable'),
                role.mentionable ? `${cEmojis.success} ${t('common/yes')}` : `${cEmojis.error} ${t('common/no')}`,
                true
            )
            .addField(
                t('members'),
                role.members.size.toString(),
                true
            )
            .addField(
                t('created'),
                moment(role.createdTimestamp).calendar().capitalize(),
                true
            )
            .addField(
                t('permissions'),
                role.permissions.toArray().includes('ADMINISTRATOR') ?
                    `\`${t(`common/permissions.ADMINISTRATOR`)}\`` :
                    role.permissions.toArray()
                        .filter(n => !message.guild.roles.everyone.permissions.toArray().includes(n))
                        .map(p => `\`${t(`common/permissions.${p}`)}\``)
                        .join(', '),
                true
            )

        return message.channel.send({ embeds: [embed] })
    }
}

module.exports = Role