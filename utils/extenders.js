const { Guild, Message, MessageEmbed, GuildMember, MessageMentions, TextChannel } = require("discord.js");
const { db } = require('../db')
const config = require("../config");
const { MessageButton } = require('discord-buttons');

Guild.prototype.getMember = (key) => {
    const
        idRegex = /^\d{17,19}$/,
        tagRegex = /^.{3,32}#[0-9]{4}$/

    // Id
    if(idRegex.test(key)) {
        return this.members.cache.get(key)
    }
    // Mention
    if(MessageMentions.USERS_PATTERN.test(key)) {
        const id = /\d+/.match(key)
        return this.members.cache.get(id)
    }
    // Tag
    if(tagRegex.test(key)) {
        return this.members.cache.find(m => m.tag === key)
    }
    // Display name
    return this.members.cache.find(m => m.displayName === key)
}

TextChannel.prototype.sendStyledMessage = async function(emoji, text) {
    const guildData = await this.client.getGuildData(this.guild.id)
    const { themeColor } = guildData.preferences

    this.send({
        embeds: [
            new MessageEmbed()
                .setColor(themeColor || this.client.defaultColor)
                .setDescription(`${emoji} ${text}`)
        ]
    })
}

TextChannel.prototype.success = async function(text) {
    this.sendStyledMessage(this.client.cEmojis.success, text)
}

TextChannel.prototype.error = async function(text) {
    this.sendStyledMessage(this.client.cEmojis.error, text)
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}