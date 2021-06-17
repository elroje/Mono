const Discord = require('discord.js')
const glob = require('glob')
const fs = require('fs')
const db = require('./db')
const { getTranslator } = require('./locale')
const moment = require('moment')
require('./utils/extenders')
// Connecting .env file
require('dotenv').config()
const config = require('./config')
const chalk = require('chalk')
const { getSafe, updateGuildData } = require('./utils')
const emojis = require('./emojis.json')

const Mono = require('./base/mono')
const client = new Mono();

//require('discord-buttons')(client)

// Events handler
glob('events/**/*.js', function(err, eventFiles) {
    for (const file of eventFiles) {
        const event = require(`./${file}`)
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client))
        } else {
            client.on(event.name, (...args) => event.execute(...args, client))
        }
    }
})

// Load commands
client.commands = new Discord.Collection()

glob('commands/**/*.js', function(err, files) {
    for (const file of files) {
        const command = require(`./${file}`)
        client.commands.set(command.name, command)
    }
});

// Run command handler
const handleCommand = require('./handlers/command')
client.on('message', handleCommand)

client.login(process.env.TOKEN)
