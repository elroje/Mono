module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member, client) {
        const guildData = await member.client.getGuildData(member.guild.id)

        if(!guildData.modules?.autorole?.enabled) return

        const autoroleId = guildData.autorole

        if(!autoroleId) return

        member.roles.add(autoroleId)
    }
}
