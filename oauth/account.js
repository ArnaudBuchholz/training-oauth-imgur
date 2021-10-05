const { default: got } = require('got/dist/source')
const { get } = require('./session')

module.exports = async (request, response) => {
  const imgur = get(request)
  const { account_username, access_token } = imgur
  const { body } = await got(`https://api.imgur.com/3/account/${account_username}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    responseType: 'json'
  })
  const data = JSON.stringify(body.data)
  response.writeHead(200, {
    'content-type': 'application/json',
    'content-length': data.length
  })
  response.end(data)
}
