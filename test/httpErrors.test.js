'use strict'

const { test } = require('tap')
const createError = require('http-errors')
const statusCodes = require('http').STATUS_CODES
const Fastify = require('fastify')
const Sensible = require('../index')
const HttpError = require('../lib/httpErrors').HttpError

test('Should generate the correct http error', t => {
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)

    Object.keys(statusCodes).forEach(code => {
      if (Number(code) < 400) return
      const name = normalize(code, statusCodes[code])
      const err = fastify.httpErrors[name]()
      t.ok(err instanceof HttpError)
      // `statusCodes` uses the capital T
      if (err.message === 'I\'m a Teapot') {
        t.equal(err.statusCode, 418)
      } else {
        t.equal(err.message, statusCodes[code])
      }
      t.equal(typeof err.name, 'string')
      t.equal(err.statusCode, Number(code))
    })

    t.end()
  })
})

test('Should expose the createError method from http-errors', t => {
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)

    t.equal(fastify.httpErrors.createError, createError)
    t.end()
  })
})

test('Should generate the correct error using the properties given', t => {
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    const customError = fastify.httpErrors.createError(404, 'This video does not exist!')
    t.ok(customError instanceof HttpError)
    t.equal(customError.message, 'This video does not exist!')
    t.equal(typeof customError.name, 'string')
    t.equal(customError.statusCode, 404)
    t.end()
  })
})

test('Should generate the correct http error (with custom message)', t => {
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)

    Object.keys(statusCodes).forEach(code => {
      if (Number(code) < 400) return
      const name = normalize(code, statusCodes[code])
      const err = fastify.httpErrors[name]('custom')
      t.ok(err instanceof HttpError)
      t.equal(err.message, 'custom')
      t.equal(typeof err.name, 'string')
      t.equal(err.statusCode, Number(code))
    })

    t.end()
  })
})

function normalize (code, msg) {
  if (code === '414') return 'uriTooLong'
  if (code === '418') return 'imateapot'
  if (code === '505') return 'httpVersionNotSupported'
  msg = msg.split(' ').join('').replace(/'/g, '')
  msg = msg[0].toLowerCase() + msg.slice(1)
  return msg
}
