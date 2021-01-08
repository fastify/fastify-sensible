'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const Sensible = require('../index')

test('reply.cacheControl API', t => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.cacheControl('public')
    reply.send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.statusCode, 200)
    t.strictEqual(res.headers['cache-control'], 'public')
    t.strictEqual(res.payload, 'ok')
  })
})

test('reply.cacheControl API (multiple values)', t => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply
      .cacheControl('public')
      .cacheControl('max-age', 604800)
      .cacheControl('immutable')
      .send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.statusCode, 200)
    t.strictEqual(res.headers['cache-control'], 'public, max-age=604800, immutable')
    t.strictEqual(res.payload, 'ok')
  })
})

test('reply.noCache API', t => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.noCache().send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.statusCode, 200)
    t.strictEqual(res.headers['cache-control'], 'no-store, max-age=0')
    t.strictEqual(res.payload, 'ok')
  })
})

test('reply.stale API', t => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.stale('while-revalidate', 42).send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.statusCode, 200)
    t.strictEqual(res.headers['cache-control'], 'stale-while-revalidate=42')
    t.strictEqual(res.payload, 'ok')
  })
})

test('reply.stale API (multiple values)', t => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply
      .stale('while-revalidate', 42)
      .stale('if-error', 1)
      .send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.statusCode, 200)
    t.strictEqual(res.headers['cache-control'], 'stale-while-revalidate=42, stale-if-error=1')
    t.strictEqual(res.payload, 'ok')
  })
})
