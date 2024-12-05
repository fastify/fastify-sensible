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

  const httpErrorsKeys = Object.keys(httpErrors)
  for (let i = 0; i < httpErrorsKeys.length; ++i) {
    const httpError = httpErrorsKeys[i]

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
  }

  if (opts?.sharedSchemaId) {
    // The schema must be the same as:
    // https://github.com/fastify/fastify/blob/c08b67e0bfedc9935b51c787ae4cd6b250ad303c/build/build-error-serializer.js#L8-L16
    fastify.addSchema({
      $id: opts.sharedSchemaId,
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        code: { type: 'string' },
        error: { type: 'string' },
        message: { type: 'string' }
      }
    })
  }

  function to (promise) {
    return promise.then(data => [null, data], err => [err, undefined])
  }

  next()
}

module.exports = fp(fastifySensible, {
  name: '@fastify/sensible',
  fastify: '5.x'
})
module.exports.default = fastifySensible
module.exports.fastifySensible = fastifySensible
module.exports.httpErrors = httpErrors
module.exports.HttpError = httpErrors.HttpError
