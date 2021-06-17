const { getCommandTranslator, getTranslator } = require('../utils/localization')
const { getSafe } = require('../utils')
const glob = require('glob')
const { MessageEmbed } = require('discord.js')

const getCommands = (client) => {
    const paths = glob.sync('commands/**/*.js');
    const commandsClasses = paths.map(path => require(`./../${path}`))
    const commands = commandsClasses.map(commandClass => new commandClass(client))
    return commands
}

const handleCommand = async (message) => {
    const { client } = message
    const guildData = await client.getGuildData(message.guild.id)

    // Get translator for handler messages
    const t = getTranslator(guildData.preferences?.language || 'en')

    // Get commands
    client.commands = getCommands(client)

    // Ignore DM (for now)
    if(!message.guild) return

    // Ignore myself
    if(message.author.id === client.user.id) return

    // Ignore bots if needed
    const botPermitted = getSafe(() => guildData.preferences.allowBotCommands, false)
    if(message.author.bot && !botPermitted) return

    // Get guild prefixes
    const prefixes = guildData.prefixes || [client.defaultPrefix]
    const mentionPrefixEnabled = guildData.preferences?.mentionPrefix === undefined ? true : false // ToDo: Fix this shit pls
    if(mentionPrefixEnabled) prefixes.push(`<@${client.user.id}>`, `<@!${client.user.id}>`)

    // Check for prefix
    let prefix
    for(const currentPrefix of prefixes) {
        if(message.content.toLowerCase().startsWith(currentPrefix.toLowerCase())) prefix = currentPrefix
    }
    if(!prefix) return

    // Get command args
    let args = message.content
        .replace(prefix, '') // Removes the prefix
        .replace(/\s+/g, ' ').trim() // Gets rid of extra spaces
        .split(/ +/);

    // Get typed command name
    const commandQuery = args.shift().toLowerCase();

    // Get command
    const command = client.commands.find(cmd => cmd.name === commandQuery || cmd.aliases.includes(commandQuery))

    // If command not found, ignore
    if(!command) return

    // Check if command is disabled on the guild
    if(getSafe(() => guildData.commands[command.name].disabled, false)) return

    // Check member permissions
    if(command.memberPermissions) {
        let neededPermissions = [];
        command.memberPermissions.forEach((perm) => {
            if(!message.channel.permissionsFor(message.member).has(perm)) {
                neededPermissions.push(perm)
            }
        })
        if(!message.member.permissions.has(command.memberPermissions)) {
            message.channel.send(new MessageEmbed()
                .setDescription(t('misc/missingMemberPermissions', {
                        list: neededPermissions.map(perm => `\`${t(`common/permissions.${perm}`)}\``).join(', ')
                }))
                .setColor(guildData.preferences.themeColor || client.defaultColor)
            )
            return
        }
    }

    // Check bot permissions
    if(command.botPermissions) {
        let neededPermissions = [];
        command.botPermissions.forEach((perm) => {
            if(!message.channel.permissionsFor(message.guild.me).has(perm)) {
                neededPermissions.push(perm)
            }
        })
        if(!message.guild.me.permissions.has(command.botPermissions)) {
            message.channel.send(new Discord.MessageEmbed()
                .setDescription(t('misc/missingBotPermissions', {
                    list: neededPermissions.map(perm => `\`${t(`common/permissions.${perm}`)}\``).join(', ')
                }))
                .setColor(message.guild.data.themeColor || config.colors.invisible)
            )
            return
        }
    }

    // Get translator for command
    const commandTranslator = await getCommandTranslator(command, message)

    // Run command
    try {
        command.execute(message, args, commandTranslator)
    } catch (e) {
        console.error(e)
    }
}

module.exports = handleCommand