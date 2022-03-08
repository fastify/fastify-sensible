'use strict'

const { test } = require('tap')
const statusCodes = require('http').STATUS_CODES
const Fastify = require('fastify')
const Sensible = require('../index')

test('Should generate the correct http error', t => {
  Object.keys(statusCodes).forEach(code => {
    if (Number(code) < 400) return
    t.test(code, t => {
      t.plan(3)
      const fastify = Fastify()
      fastify.register(Sensible)

      fastify.get('/', (req, reply) => {
        const name = normalize(code, statusCodes[code])
        reply[name]()
      })

      fastify.inject({
        method: 'GET',
        url: '/'
      }, (err, res) => {
        t.error(err)
        t.equal(res.statusCode, Number(code))
        if (code === '418') {
          // https://github.com/fastify/fastify/blob/b96934d46091bb1c93f55b07149520bb9e5c0729/lib/reply.js#L350-L355
          t.same(JSON.parse(res.payload), {
            error: 'I\'m a Teapot',
            message: 'I\'m a Teapot',
            statusCode: 418
          })
          // TODO should be deleted after release of https://github.com/jshttp/http-errors/pull/73
        } else if (code === '425') {
          t.same(JSON.parse(res.payload), {
            error: 'Too Early',
            message: 'Too Early',
            statusCode: 425
          })
        } else {
          t.same(JSON.parse(res.payload), {
            error: statusCodes[code],
            message: statusCodes[code],
            statusCode: Number(code)
          })
        }
      })
    })
  })
  t.end()
})

test('Should generate the correct http error using getter', t => {
  Object.keys(statusCodes).forEach(code => {
    if (Number(code) < 400) return
    t.test(code, t => {
      t.plan(3)
      const fastify = Fastify()
      fastify.register(Sensible)

      fastify.get('/', (req, reply) => {
        reply.getHttpError(code)
      })

      fastify.inject({
        method: 'GET',
        url: '/'
      }, (err, res) => {
        t.error(err)
        if (code === '418') {
          t.equal(res.statusCode, 500)
          t.same(JSON.parse(res.payload), {
            error: 'Internal Server Error',
            message: 'Something went wrong',
            statusCode: 500
          })
        } else {
          t.equal(res.statusCode, Number(code))
          t.same(JSON.parse(res.payload), {
            error: statusCodes[code],
            message: statusCodes[code],
            statusCode: Number(code)
          })
        }
      })
    })
  })
  t.end()
})

test('Should generate the correct http error (with custom message)', t => {
  Object.keys(statusCodes).forEach(code => {
    if (Number(code) < 400) return
    t.test(code, t => {
      t.plan(3)
      const fastify = Fastify()
      fastify.register(Sensible)

      fastify.get('/', (req, reply) => {
        const name = normalize(code, statusCodes[code])
        reply[name]('custom')
      })

      fastify.inject({
        method: 'GET',
        url: '/'
      }, (err, res) => {
        t.error(err)
        t.equal(res.statusCode, Number(code))
        t.same(JSON.parse(res.payload), {
          error: statusCodes[code],
          message: 'custom',
          statusCode: Number(code)
        })
      })
    })
  })
  t.end()
})

function normalize (code, msg) {
  if (code === '414') return 'uriTooLong'
  if (code === '418') return 'imateapot'
  if (code === '505') return 'httpVersionNotSupported'
  msg = msg.split(' ').join('').replace(/'/g, '')
  msg = msg[0].toLowerCase() + msg.slice(1)
  return msg
}
