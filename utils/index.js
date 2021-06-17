const fs = require('fs')
const pathModule = require('path')
const chalk = require('chalk')
const db = require('../db')
const merge = require('deepmerge')

module.exports = {
    readProperties(absolutePath) {
        let source = fs.readFileSync(absolutePath, 'utf-8')
        let pairs = source.split('\n')
        let output = {}
        pairs.forEach((item) => {
            let tempArray = item.split(/ = /)
            let key = tempArray.shift()
            if (key) output[key] = tempArray.join(' = ').replace(/\r$/, '')
        })
        return output
    },

    async getGuildData(guildId) {
        if (!/^\d{18}$/.test(guildId)) return
        return (await db.query('SELECT * FROM guilds WHERE id = $1', [message.guild.id])).rows[0].data
    },

    fromPathString(object, path) {
        path = path.split('.');
        for (let i = 0; i < path.length; i++) {
            object = (object[path[i]]) ? object[path[i]] : object[path[i]] = {};
        }
        return object
    },

    getSafe(fn, defaultVal) {
        try {
            return fn();
        } catch (e) {
            return defaultVal;
        }
    },

    async updateGuildData(guildId, data, callback) {
        if(!guildId) return
        if(!data) return

        let oldData = (await db.query('select * from public.guilds where id = $1', [guildId])).rows[0].data
        let newData = merge (oldData, data)
        // Send new data object to database
        db.query('update public.guilds set data = $1 where id = $2', [newData, guildId])
        // Return value or call callback
        if(callback) return callback(newData)
        else return newData
    },

    codeScope(string) {
        return '```' + string + '```'
    }
}
