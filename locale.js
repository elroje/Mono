const { readProperties } = require('./utils')
const { chalk } = require('chalk')
const fs = require('fs')
const { fromPathString } = require("./utils");
const merge = require('merge')

module.exports = {
    getTranslator(guildData) {
        let strings = fs.existsSync(`./locales/${guildData.preferences.language}.json`)
            ? merge.recursive(require(`./locales/en.json`), require(`./locales/${guildData.preferences.language}.json`))
            : require(`./locales/en.json`)

        let emojis = require('./emojis.json') // ToDo: add emoji kit support
        return function(stringCode, parameters) {
            stringCode = stringCode.replace(/\$/, 'command.') // command.<name> shortcut
            return fromPathString(strings, stringCode).toString()
                .replace( // Replaces {{templates}} to values
                    new RegExp('\{{.*?\}}', 'g'),
                    (match) => {
                        return parameters[match.substring(2, match.length - 2)]
                    }
                )
                .replace( // Replaces {e.templates} to emojis
                    new RegExp('\{e\..*?\}', 'g'),
                    (match) => {
                        return emojis[match.substring(3, match.length - 1)]
                    }
                )
        }
    },
}
