'use strict'

require('dotenv').config()
const got = require('got')
const { get, verify } = require('./state')
const { allocate, set } = require('./session')

const authToken = 'https://api.imgur.com/oauth2/token'

module.exports = async (request, response) => {
  function redirect (location) {
    response.writeHead(302, { location })
    response.end()
  }

  const [, state] = request.url.match(/state=([^&]+)(&.*)?$/)
  if (!verify(state)) {
    return redirect('/denied.html')
  }

  const { resolver } = get(state)
  if (request.url.match(/error=access_denied/)) {
    resolver('denied')
    return redirect('/denied.html')
  }

  const [, code] = request.url.match(/code=(.*)/)
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

  set(response, body)
  resolver('success')
  return redirect('/approved.html')
}
