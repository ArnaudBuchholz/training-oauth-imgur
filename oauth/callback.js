'use strict'

require('dotenv').config()
const got = require('got')
const { verify: verifyState } = require('./state')

const authToken = 'https://api.imgur.com/oauth2/token'

module.exports = async (request, response) => {
  const [, state, code] = request.url.match(/state=([^&]+)&code=(.*)/)
  if (!verifyState(state)) {
    return 403
  }
  console.log('Received CODE :', code)
  const form = {
    client_id: process.env.IMGUR_APP_CLIENT_ID,
    client_secret: process.env.IMGUR_APP_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code
  }
  const { body } = await got.post(authToken, {
    form,
    responseType: 'json'
  })
  console.log(body)
  response.writeHead(200)
  response.end('We should send an HTML answer that closes the window')
}
