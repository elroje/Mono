const pg = require('pg')

const db = new pg.Pool({
    user:     'zephyr',
    host:     'localhost',
    database: 'mono',
    password: 'Kfdfhjke54Dsde',
    port:     5432
})

module.exports = db