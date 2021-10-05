'use strict'

require('dotenv').config()
const { nanoid } = require('nanoid')

const stateTimeout = parseInt(process.env.STATE_TIMEOUT, 10)

const states = {}

module.exports = {
  allocate () {
    const state = nanoid()
    const stateObject = {}
    stateObject.promise = new Promise(resolve => {
      stateObject.resolver = function (status) {
        console.log(state, '=>', status)
        stateObject.status = status
        resolve(status)
        delete states[state]
      }
      setTimeout(() => stateObject.resolver('timeout'), stateTimeout)
    })
    states[state] = stateObject
    return state
  },

  get (state) {
    return states[state]
  },

  verify (state) {
    return !!states[state]
  }
}