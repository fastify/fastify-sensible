'use strict'

const fp = require('fastify-plugin')
// External utilities
const forwarded = require('forwarded')
const typeis = require('type-is')
// Internals Utilities
const httpErrors = require('./lib/httpErrors')
const assert = require('./lib/assert')
const vary = require('./lib/vary')
const cache = require('./lib/cache-control')

function fastifySensible (fastify, opts, next) {
  fastify.decorate('httpErrors', httpErrors)
  fastify.decorate('assert', assert)
  fastify.decorate('to', to)

  fastify.decorateRequest('forwarded', function () {
    return forwarded(this.raw)
  })

  fastify.decorateRequest('is', function (types) {
    return typeis(this.raw, Array.isArray(types) ? types : [types])
  })

  fastify.decorateReply('vary', vary)
  fastify.decorateReply('cacheControl', cache.cacheControl)
  fastify.decorateReply('preventCache', cache.preventCache)
  fastify.decorateReply('revalidate', cache.revalidate)
  fastify.decorateReply('staticCache', cache.staticCache)
  fastify.decorateReply('stale', cache.stale)
  fastify.decorateReply('maxAge', cache.maxAge)

  // TODO: benchmark if this closure causes some performance drop
  Object.keys(httpErrors).forEach(httpError => {
    switch (httpError) {
      case 'HttpError':
        // skip abstract class constructor
        break
      case 'getHttpError':
        fastify.decorateReply('getHttpError', function (errorCode, message) {
          this.send(httpErrors.getHttpError(errorCode, message))
          return this
        })
        break
      default:
        fastify.decorateReply(httpError, function (message) {
          this.send(httpErrors[httpError](message))
          return this
        })
    }
  })

  function to (promise) {
    return promise.then(data => [null, data], err => [err, undefined])
  }

  next()
}

module.exports = fp(fastifySensible, {
  name: '@fastify/sensible',
  fastify: '4.x'
})
