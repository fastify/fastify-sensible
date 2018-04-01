'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const Sensible = require('../index')

test('request.proxyaddr API', t => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.send(req.proxyaddr(addr => addr === '127.0.0.1'))
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.statusCode, 200)
    t.strictEqual(res.payload, '127.0.0.1')
  })
})

test('request.proxyaddr API', t => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.send(req.proxyaddr(['127.0.0.0/8', '10.0.0.0/8']))
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.statusCode, 200)
    t.strictEqual(res.payload, '127.0.0.1')
  })
})
