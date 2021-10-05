const { nanoid } = require('nanoid')

const sessions = {}

module.exports = {
  set (response, value) {
    const session = nanoid()
    sessions[session] = value
    response.setHeader('set-cookie', `session-id=${session}; HttpOnly; SameSite=Strict`)
    return session
  },

  get (request) {
    try {
      const sessionIdPrefix = 'session-id='
      const sessionId = request.headers.cookie
        .split('; ')
        .filter(cookie => cookie.startsWith(sessionIdPrefix))
        [0]
        .substring(sessionIdPrefix.length)
      return sessions[sessionId]
    } catch (e) {
      console.error(e)
      return undefined
    }
  }
}
