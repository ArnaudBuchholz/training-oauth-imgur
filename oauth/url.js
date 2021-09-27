'use strict'

require('dotenv').config()
const { get: getState } = require('./state')

const authUrl = 'https://api.imgur.com/oauth2/authorize'

module.exports = async (request, response) => {
  const url = `${authUrl}?client_id=${process.env.IMGUR_APP_CLIENT_ID}&response_type=code&state=${getState()}`
  console.log('URL :', url)
  const body = JSON.stringify({ url })
  response.writeHead(200, {
      'content-type': 'application/json',
      'content-length': body.length
  })
  response.end(body)
}
