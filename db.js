const pg = require('pg')
require('dotenv').config()

console.log(process.env.DB_PASSWORD)

const db = new pg.Pool({
    user:     process.env.DB_USER,
    host:     process.env.DB_HOST,
    database: 'mono',
    password: process.env.DB_PASSWORD,
    port:     process.env.DB_PORT
})

module.exports = db