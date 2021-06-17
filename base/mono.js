const { Client, Collection, MessageEmbed, Intents } = require('discord.js')
const db = require('../db')
const merge = require('merge')

class Mono extends Client {
    constructor() {
        super({
            partials: [
                'MESSAGE',
                'CHANNEL',
                'REACTION',
                'GUILD_MEMBER',
                'USER'
            ],
            intents: [
                Intents.ALL
            ]
        })

        this.config = require('../config')
        this.cEmojis = require('../emojis.json')
        this.commands = new Collection()
        this.defaultPrefix = 'm.'
        this.defaultColor = this.config.colors.invisible

        this.regex = {
            id: /^\d{17,19}$/,
            url: /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
            urlWithProtocol: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
            hexColor: /^#?(?:[0-9a-fA-F]{3}){1,2}$/
        }
    }

    async getGuildData(guildId) {
        if(!this.regex.id.test(guildId)) return
        const guildData = (await db.query('SELECT data FROM guilds WHERE id = $1', [guildId])).rows[0].data // ToDo: Add guild existing check
        return guildData
    }

    async getMemberData(guildId, userId) {
        if(!this.regex.id.test(id)) return
        const guildData = (await db.query('SELECT data FROM guilds WHERE id = $1', [id])).rows[0].data // ToDo: Add guild existing check
        return guildData
    }

    async getUserData(userId) {
        if(!this.regex.id.test(userId)) return
        const guildData = (await db.query('SELECT data FROM users WHERE id = $1', [userId])).rows[0].data // ToDo: Add guild existing check
        return guildData
    }

    async updateGuildData(guildId, data, callback) {
        if(!guildId) return
        if(!data) return

        let oldData = (await db.query('select * from public.guilds where id = $1', [guildId])).rows[0].data
        let newData = merge(oldData, data)
        // Send new data object to database
        db.query('update public.guilds set data = $1 where id = $2', [newData, guildId])
        // Return value or call callback
        if(callback) return callback(newData)
        else return newData
    }
}

module.exports = Mono