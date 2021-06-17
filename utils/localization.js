const
    db = require('../db'),
    emojis = require('./../emojis.json'),
    { fromPathString } = require("./index");

module.exports.getCommandTranslator = async (command, message) => {
    const commandName = command.name
    const category = command.category || 'other'
    const guildId = message.guild.id

    const guildData = message.client.getGuildData(message.guild.id)
    const language = guildData.preferences?.language || 'en'

    return function (key, parameters = {}) {
        // ToDo: Add prefixes support (e.x. 'misc/yes' refers to misc.json file)
        let source
        if(key.includes('/')) {
            [source, key] = key.split('/')
        }

        let strings
        if(!source) {
            strings = require(`../locales/${language}/commands/${category}/${commandName}.json`)
        } else if(source === 'help') {
            strings = require(`../locales/${language}/commands/${category}/${commandName}.help.json`)
        } else {
            strings = require(`../locales/${language}/${source}.json`)
        }

        parameters.prefix = guildData.prefixes ? guildData.prefixes[0] : message.client.defaultPrefix

        const string = fromPathString(strings, key).toString()
            .replace( // Replaces {{templates}} to values
                new RegExp('\{{.*?\}}', 'g'),
                (match) => {
                    return parameters[match.substring(2, match.length - 2)]
                }
            )
            .replace( // Replaces {e.emojiNames} to emojis
                new RegExp('\{e\..*?\}', 'g'),
                (match) => {
                    return emojis[match.substring(3, match.length - 1)]
                }
            )

        return string
    }
}

module.exports.getTranslator = (language = 'en') => {
    return function (key, parameters = {}) {
        // ToDo: Add prefixes support (e.x. 'misc/yes' refers to misc.json file)
        let source
        if(key.includes('/')) {
            [source, key] = key.split('/')
        }

        if(!source) return
        const strings = require(`../locales/${language}/${source}.json`)

        const string = fromPathString(strings, key).toString()
            .replace( // Replaces {{templates}} to values
                new RegExp('\{{.*?\}}', 'g'),
                (match) => {
                    return parameters[match.substring(2, match.length - 2)]
                }
            )
            .replace( // Replaces {e.emojiNames} to emojis
                new RegExp('\{e\..*?\}', 'g'),
                (match) => {
                    return emojis[match.substring(3, match.length - 1)]
                }
            )

        return string
    }
}