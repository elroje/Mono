const { MessageEmbed } = require('discord.js')
const config = require('../../config')
const { getSafe } = require("../../utils");
const Command = require('../../base/command')

class Help extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: ['?'],
            category: 'general',
            disableable: false,
            props: {
                listDisplay: 'oneMessage' // oneMessage / slider / pages
            },
            memberPermissions: [],
            botPermissions: ['SEND_MESSAGES'],
        });
    }
    async execute(message, args, t) {
        const { client } = message
        const guildData = await message.client.getGuildData(message.guild.id)
        const { themeColor } = guildData

        // Display command list if no arguments provided
        if(!args[0]) {
            if(this.props.listDisplay === 'oneMessage') {
                const embed = new MessageEmbed()
                    .setColor(themeColor || client.defaultColor)
                    .setTitle(t('commandListTitle'))
                    .setFooter(t('commandListFooter'))

                const categories = client.commands
                    .filter(c => message.member.permissionsIn(message.channel).has(c.memberPermissions))
                    .filter(c => !c.hidden)
                    .reduce((acc, cmd) => {
                        if (!acc[cmd.category]) acc[cmd.category] = [];
                        acc[cmd.category].push(cmd);
                        return acc;
                    }, {})

                for(const [category, commands] of Object.entries(categories)) {
                    embed.addField(
                        t(`common/categories.${category}`).capitalize(),
                        commands.map(cmd => `\`${cmd.name}\``).join(', '),
                        true
                    )
                }

                message.channel.send({
                    embeds: [embed]
                })
            }
        }
    }
}

module.exports = Help