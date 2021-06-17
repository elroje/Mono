class Command {
    constructor(client, {
        name = null,
        aliases = new Array(),
        category = null,
        module = null,
        disabled = false,
        disableable = false,
        hidden = false,
        props = new Object(),
        botPermissions = new Array(),
        memberPermissions = new Array(),
        nsfw = false,
        ownerOnly = false,
        cooldown = 3000
    }) {
        this.client = client

        this.name = name
        this.aliases = aliases
        this.category = category
        this.disabled = disabled
        this.disableable = disableable
        this.props = props
        this.botPermissions = botPermissions
        this.memberPermissions = memberPermissions
        this.nsfw = nsfw
        this.ownerOnly = ownerOnly
        this.cooldown = cooldown
    }
}

module.exports = Command
