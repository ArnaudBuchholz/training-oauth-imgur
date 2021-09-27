'use strict'

const { nanoid } = require('nanoid')

const generated = []

module.exports = {
  get: () => {
    const state = nanoid()
    generated.push(state) // ttl ?
    return state
  },

  verify: state => {
    return generated.includes(state)
  }
}