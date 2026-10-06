'use strict'

// Cache control header utilities, for more info see:
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
// Useful reads:
// - https://odino.org/http-cache-101-scaling-the-web/
// - https://web.dev/case-studies/ads-case-study-stale-while-revalidate
// - https://csswizardry.com/2019/03/cache-control-for-civilians/
// - https://jakearchibald.com/2016/caching-best-practices/

const assert = require('node:assert')
const ms = require('@lukeed/ms').parse

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

// Converts a time to seconds, rejecting values that would render as an
// invalid directive such as `max-age=NaN` (e.g. an unparsable string)
function toSeconds (time) {
  if (typeof time === 'string') {
    time = ms(time) / 1000
  }
  assert(Number.isFinite(time) && time >= 0, 'The cache control time should be a non-negative number')
  return time
}

function cacheControl (type, time) {
  const previoustime = this.getHeader('Cache-Control')
  if (time == null) {
    assert(validSingletimes.indexOf(type) !== -1, `Invalid Cache Control type: ${type}`)
    this.header('Cache-Control', previoustime ? `${previoustime}, ${type}` : type)
  } else {
    assert(validMultitimes.indexOf(type) !== -1, `Invalid Cache Control type: ${type}`)
    time = toSeconds(time)
    this.header('Cache-Control', previoustime ? `${previoustime}, ${type}=${time}` : `${type}=${time}`)
  }
  return this
}

function preventCache () {
  this
    .header('Cache-Control', 'no-store, max-age=0, private')
    // compatibility support for HTTP/1.0
    // see: https://owasp.org/www-community/OWASP_Application_Security_FAQ#how-do-i-ensure-that-sensitive-pages-are-not-cached-on-the-users-browser
    .header('Pragma', 'no-cache')
    .header('Expires', 0)

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
  time = toSeconds(time)
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
