const { readProperties } = require('../utils')
const db = require('./../db')

module.exports = {
    name: 'message',
    once: false,
    async execute(message, client) {
        if(message.content.replace(/\s+/g, ' ').trim() !== '<@!832988472779735050>' || message.author.bot) return
        message.channel.send(
            (await db.query('select * from public.guilds where id = $1', [message.guild.id])).rows[0].data.prefix || 'm.'
        )
    }
}
