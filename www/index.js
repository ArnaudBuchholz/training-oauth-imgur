'use strict'

const byId = id => document.getElementById(id)

byId('login').addEventListener('click', async () => {
  const response = await fetch('/url')
  const json = await response.json()
  window.open(json.url, '_blank', 'scrollbars=1,height=600,width=450,noopener,noreferrer')
})
