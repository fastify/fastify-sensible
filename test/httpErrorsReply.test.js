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
        t.strictEqual(res.statusCode, Number(code))
        t.deepEqual(JSON.parse(res.payload), {
          error: statusCodes[code],
          message: code === '500' ? 'Something went wrong' : statusCodes[code],
          statusCode: Number(code)
        })
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
        t.strictEqual(res.statusCode, Number(code))
        t.deepEqual(JSON.parse(res.payload), {
          error: statusCodes[code],
          message: code === '500' ? 'Something went wrong' : 'custom',
          statusCode: Number(code)
        })
      })
    })
  })
  t.end()
})

function normalize (code, msg) {
  if (code === '414') return 'uriTooLong'
  if (code === '505') return 'httpVersionNotSupported'
  msg = msg.split(' ').join('').replace(/'/g, '')
  msg = msg[0].toLowerCase() + msg.slice(1)
  return msg
}
