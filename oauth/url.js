'use strict'

require('dotenv').config()
const { allocate } = require('./state')

const authUrl = 'https://api.imgur.com/oauth2/authorize'

module.exports = async (request, response) => {
  const state = allocate()
  const url = `${authUrl}?client_id=${process.env.IMGUR_APP_CLIENT_ID}&response_type=code&state=${state}`
  console.log({ url, state })
  response.writeHead(302, {
    location: url
  })
  response.end()
}
