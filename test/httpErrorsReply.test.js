'use strict'

const { test } = require('node:test')
const statusCodes = require('node:http').STATUS_CODES
const Fastify = require('fastify')
const Sensible = require('../index')

test('Should generate the correct http error', (t, rootDone) => {
  const codes = Object.keys(statusCodes).filter(code => Number(code) >= 400 && code !== '418')
  let completedTests = 0

  codes.forEach(code => {
    t.test(code, (t, done) => {
      t.plan(4)
      const fastify = Fastify()
      fastify.register(Sensible)

      fastify.get('/', (_req, reply) => {
        const name = normalize(code, statusCodes[code])
        t.assert.strictEqual(reply[name](), reply)
      })

      fastify.inject({
        method: 'GET',
        url: '/'
      }, (err, res) => {
        t.assert.ifError(err)
        t.assert.strictEqual(res.statusCode, Number(code))
        if (code === '425') {
          t.assert.deepStrictEqual(JSON.parse(res.payload), {
            error: 'Too Early',
            message: 'Too Early',
            statusCode: 425
          })
        } else {
          t.assert.deepStrictEqual(JSON.parse(res.payload), {
            error: statusCodes[code],
            message: statusCodes[code],
            statusCode: Number(code)
          })
        }
        done()
        completedTests++

        if (completedTests === codes.length) {
          rootDone()
        }
      })
    })
  })
})

test('Should generate the correct http error using getter', (t, rootDone) => {
  const codes = Object.keys(statusCodes).filter(code => Number(code) >= 400 && code !== '418')
  let completedTests = 0

  codes.forEach(code => {
    t.test(code, (t, done) => {
      t.plan(4)
      const fastify = Fastify()
      fastify.register(Sensible)

      fastify.get('/', (_req, reply) => {
        t.assert.strictEqual(reply.getHttpError(code), reply)
      })

      fastify.inject({
        method: 'GET',
        url: '/'
      }, (err, res) => {
        t.assert.ifError(err)
        t.assert.strictEqual(res.statusCode, Number(code))
        t.assert.deepStrictEqual(JSON.parse(res.payload), {
          error: statusCodes[code],
          message: statusCodes[code],
          statusCode: Number(code)
        })
        done()
        completedTests++

        if (completedTests === codes.length) {
          rootDone()
        }
      })
    })
  })
})

test('Should generate the correct http error (with custom message)', (t, rootDone) => {
  const codes = Object.keys(statusCodes).filter(code => Number(code) >= 400 && code !== '418')
  let completedTests = 0

  codes.forEach(code => {
    t.test(code, (t, done) => {
      t.plan(3)
      const fastify = Fastify()
      fastify.register(Sensible)

      fastify.get('/', (_req, reply) => {
        const name = normalize(code, statusCodes[code])
        reply[name]('custom')
      })

      fastify.inject({
        method: 'GET',
        url: '/'
      }, (err, res) => {
        t.assert.ifError(err)
        t.assert.strictEqual(res.statusCode, Number(code))
        t.assert.deepStrictEqual(JSON.parse(res.payload), {
          error: statusCodes[code],
          message: 'custom',
          statusCode: Number(code)
        })
        done()
        completedTests++

        if (completedTests === codes.length) {
          rootDone()
        }
      })
    })
  })
})

function normalize (code, msg) {
  if (code === '414') return 'uriTooLong'
  if (code === '505') return 'httpVersionNotSupported'
  msg = msg.split(' ').join('').replace(/'/g, '')
  msg = msg[0].toLowerCase() + msg.slice(1)
  return msg
}
