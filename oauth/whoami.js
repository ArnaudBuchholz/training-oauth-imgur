const { get } = require('./session')

module.exports = async (request, response) => {
  let whoami
  try {
    whoami = get(request).account_username
  } catch (e) {
    whoami = 'anonymous'
  }
  response.writeHead(200, {
    'content-type': 'text/plain',
    'content-length': whoami.length
  })
  response.end(whoami)
}
