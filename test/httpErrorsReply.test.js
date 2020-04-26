'use strict'

const { test } = require('tap')
const statusCodes = require('http').STATUS_CODES
const Fastify = require('fastify')
const Sensible = require('../index')

// from Node.js v10 and above the 418 message has been changed
const node10 = Number(process.versions.node.split('.')[0]) >= 10

// fix unsupported status codes
const unsupported = [425]
for (const code in statusCodes) {
  if (unsupported.includes(Number(code))) {
    delete statusCodes[code]
  }
}

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
        if (code === '418') {
          // https://github.com/fastify/fastify/blob/b96934d46091bb1c93f55b07149520bb9e5c0729/lib/reply.js#L350-L355
          t.deepEqual(JSON.parse(res.payload), {
            error: node10 ? 'I\'m a Teapot' : 'I\'m a teapot',
            message: 'I\'m a teapot',
            statusCode: 418
          })
        } else {
          t.deepEqual(JSON.parse(res.payload), {
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
        t.strictEqual(res.statusCode, Number(code))
        t.deepEqual(JSON.parse(res.payload), {
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
