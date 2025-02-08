'use strict'

const { test } = require('node:test')
const Fastify = require('fastify')
const Sensible = require('../index')

test('request.forwarded API', (t, done) => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.send(req.forwarded())
  })

  fastify.inject({
    method: 'GET',
    url: '/',
    headers: {
      'x-forwarded-for': '10.0.0.2, 10.0.0.1'
    }
  }, (err, res) => {
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.deepStrictEqual(
      JSON.parse(res.payload),
      ['127.0.0.1', '10.0.0.1', '10.0.0.2']
    )
    done()
  })
})

test('request.forwarded API (without header)', (t, done) => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.send(req.forwarded())
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.deepStrictEqual(
      JSON.parse(res.payload),
      ['127.0.0.1']
    )
    done()
  })
})
