'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const Sensible = require('../index')

test('reply.vary API', t => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.vary('Accept')
    reply.vary('Origin')
    reply.vary('User-Agent')
    reply.send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.statusCode, 200)
    t.strictEqual(res.headers.vary, 'Accept, Origin, User-Agent')
    t.strictEqual(res.payload, 'ok')
  })
})

test('reply.vary.append API', t => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    t.strictEqual(
      reply.vary.append('', ['Accept', 'Accept-Language']), 'Accept, Accept-Language'
    )
    reply.send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.statusCode, 200)
    t.strictEqual(res.payload, 'ok')
  })
})
