'use strict'

// Cache control header utilities, for more info see:
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
// Interesting article:
// https://odino.org/http-cache-101-scaling-the-web/

const assert = require('assert')

const validSingleValues = [
  'must-revalidate',
  'no-cache',
  'no-store',
  'no-transform',
  'public',
  'private',
  'proxy-revalidate',
  'immutable'
]

const validMultiValues = [
  'max-age',
  's-maxage',
  'stale-while-revalidate',
  'stale-if-error'
]

function cacheControl (type, value) {
  const previousValue = this.getHeader('Cache-Control')
  if (value == null) {
    assert(validSingleValues.indexOf(type) !== -1, `Invalid Cache Control type: ${type}`)
    this.header('Cache-Control', previousValue ? `${previousValue}, ${type}` : type)
  } else {
    assert(validMultiValues.indexOf(type) !== -1, `Invalid Cache Control type: ${type}`)
    assert(typeof value === 'number', 'The cache control value should be a number')
    this.header('Cache-Control', previousValue ? `${previousValue}, ${type}=${value}` : `${type}=${value}`)
  }
  return this
}

function noCache () {
  this.header('Cache-Control', 'no-store, max-age=0')
  return this
}

function stale (type, value) {
  if (type === 'while-revalidate') {
    return this.cacheControl('stale-while-revalidate', value)
  } else if (type === 'if-error') {
    return this.cacheControl('stale-if-error', value)
  } else {
    throw new Error(`Invalid cache control stale value ${value}`)
  }
}

module.exports = { cacheControl, noCache, stale }
