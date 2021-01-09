'use strict'

// Cache control header utilities, for more info see:
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
// Useful reads:
// - https://odino.org/http-cache-101-scaling-the-web/
// - https://web.dev/stale-while-revalidate/
// - https://csswizardry.com/2019/03/cache-control-for-civilians/
// - https://jakearchibald.com/2016/caching-best-practices/

const assert = require('assert')
const ms = require('ms')

const validSingletimes = [
  'must-revalidate',
  'no-cache',
  'no-store',
  'no-transform',
  'public',
  'private',
  'proxy-revalidate',
  'immutable'
]

const validMultitimes = [
  'max-age',
  's-maxage',
  'stale-while-revalidate',
  'stale-if-error'
]

function cacheControl (type, time) {
  const previoustime = this.getHeader('Cache-Control')
  if (time == null) {
    assert(validSingletimes.indexOf(type) !== -1, `Invalid Cache Control type: ${type}`)
    this.header('Cache-Control', previoustime ? `${previoustime}, ${type}` : type)
  } else {
    if (typeof time === 'string') {
      time = ms(time) / 1000
    }
    assert(validMultitimes.indexOf(type) !== -1, `Invalid Cache Control type: ${type}`)
    assert(typeof time === 'number', 'The cache control time should be a number')
    this.header('Cache-Control', previoustime ? `${previoustime}, ${type}=${time}` : `${type}=${time}`)
  }
  return this
}

function preventCache () {
  this.header('Cache-Control', 'no-store, max-age=0, private')
  return this
}

function maxAge (time) {
  return this.cacheControl('max-age', time)
}

function revalidate () {
  this.header('Cache-Control', 'max-age=0, must-revalidate')
  return this
}

function staticCache (time) {
  if (typeof time === 'string') {
    time = ms(time) / 1000
  }
  assert(typeof time === 'number', 'The cache control time should be a number')
  this.header('Cache-Control', `public, max-age=${time}, immutable`)
  return this
}

function stale (type, time) {
  if (type === 'while-revalidate') {
    return this.cacheControl('stale-while-revalidate', time)
  } else if (type === 'if-error') {
    return this.cacheControl('stale-if-error', time)
  } else {
    throw new Error(`Invalid cache control stale time ${time}`)
  }
}

module.exports = {
  cacheControl,
  preventCache,
  revalidate,
  staticCache,
  stale,
  maxAge
}
