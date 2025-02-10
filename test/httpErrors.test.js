'use strict'

const { test } = require('node:test')
const createError = require('http-errors')
const statusCodes = require('node:http').STATUS_CODES
const Fastify = require('fastify')
const Sensible = require('../index')
const HttpError = require('../lib/httpErrors').HttpError

test('Should generate the correct http error', (t, done) => {
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)

    Object.keys(statusCodes).forEach(code => {
      if (Number(code) < 400) return
      const name = normalize(code, statusCodes[code])
      const err = fastify.httpErrors[name]()
      t.assert.ok(err instanceof HttpError)
      // `statusCodes` uses the capital T
      if (err.message === 'I\'m a Teapot') {
        t.assert.strictEqual(err.statusCode, 418)
      } else {
        t.assert.strictEqual(err.message, statusCodes[code])
      }
      t.assert.strictEqual(typeof err.name, 'string')
      t.assert.strictEqual(err.statusCode, Number(code))
    })

    done()
  })
})

test('Should expose the createError method from http-errors', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    t.assert.strictEqual(fastify.httpErrors.createError, createError)
    done()
  })
})

test('Should generate the correct error using the properties given', (t, done) => {
  t.plan(5)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    const customError = fastify.httpErrors.createError(404, 'This video does not exist!')
    t.assert.ok(customError instanceof HttpError)
    t.assert.strictEqual(customError.message, 'This video does not exist!')
    t.assert.strictEqual(typeof customError.name, 'string')
    t.assert.strictEqual(customError.statusCode, 404)
    done()
  })
})

test('Should generate the correct http error (with custom message)', (t, done) => {
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)

    Object.keys(statusCodes).forEach(code => {
      if (Number(code) < 400) return
      const name = normalize(code, statusCodes[code])
      const err = fastify.httpErrors[name]('custom')
      t.assert.ok(err instanceof HttpError)
      t.assert.strictEqual(err.message, 'custom')
      t.assert.strictEqual(typeof err.name, 'string')
      t.assert.strictEqual(err.statusCode, Number(code))
    })

    done()
  })
})

test('should throw error', (t) => {
  const err = Sensible.httpErrors.conflict('custom')
  t.assert.strictEqual(err.message, 'custom')
})

function normalize (code, msg) {
  if (code === '414') return 'uriTooLong'
  if (code === '418') return 'imateapot'
  if (code === '505') return 'httpVersionNotSupported'
  msg = msg.split(' ').join('').replace(/'/g, '')
  msg = msg[0].toLowerCase() + msg.slice(1)
  return msg
}
