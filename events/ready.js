const { readProperties } = require('../utils')
const db = require('../db')
const chalk = require('chalk')

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        let color = '#FFFFFF'
        if (process.env.IS_CANARY) color = '#FFA400'
        console.log(chalk.blue(` Ready! Logged as ${client.user.tag} in ${client.guilds.cache.size} guilds `))

        // Validate servers in database
        client.guilds.cache.forEach(guild => {
            db.query(`insert into guilds values ($1) on conflict do nothing`, [guild.id])
        })

        //client.user.setPresence({ activity: { name: 'with discord.js', type: "COMPETING" }, status: 'online' })
    }
}
