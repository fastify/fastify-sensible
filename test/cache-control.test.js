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
    t.equal(res.statusCode, 200)
    t.equal(res.headers['cache-control'], 'public')
    t.equal(res.payload, 'ok')
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
    t.equal(res.statusCode, 200)
    t.equal(res.headers['cache-control'], 'public, max-age=604800, immutable')
    t.equal(res.payload, 'ok')
  })
})

test('reply.preventCache API', t => {
  t.plan(6)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.preventCache().send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.equal(res.statusCode, 200)
    t.equal(res.headers['cache-control'], 'no-store, max-age=0, private')
    t.equal(res.headers.pragma, 'no-cache')
    t.equal(res.headers.expires, 0)
    t.equal(res.payload, 'ok')
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
    t.equal(res.statusCode, 200)
    t.equal(res.headers['cache-control'], 'stale-while-revalidate=42')
    t.equal(res.payload, 'ok')
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
    t.equal(res.statusCode, 200)
    t.equal(res.headers['cache-control'], 'stale-while-revalidate=42, stale-if-error=1')
    t.equal(res.payload, 'ok')
  })
})

test('reply.stale API (bad value)', t => {
  t.plan(5)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    try {
      reply.stale('foo', 42).send('ok')
      t.fail('Should throw')
    } catch (err) {
      t.ok(err)
      reply.send('ok')
    }
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.equal(res.statusCode, 200)
    t.notOk(res.headers['cache-control'])
    t.equal(res.payload, 'ok')
  })
})

test('reply.revalidate API', t => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.revalidate().send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.equal(res.statusCode, 200)
    t.equal(res.headers['cache-control'], 'max-age=0, must-revalidate')
    t.equal(res.payload, 'ok')
  })
})

test('reply.staticCache API', t => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.staticCache(42).send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.equal(res.statusCode, 200)
    t.equal(res.headers['cache-control'], 'public, max-age=42, immutable')
    t.equal(res.payload, 'ok')
  })
})

test('reply.staticCache API (as string)', t => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.staticCache('42s').send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.equal(res.statusCode, 200)
    t.equal(res.headers['cache-control'], 'public, max-age=42, immutable')
    t.equal(res.payload, 'ok')
  })
})

test('reply.maxAge and reply.stale API', t => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply
      .maxAge(42)
      .stale('while-revalidate', 3)
      .send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.equal(res.statusCode, 200)
    t.equal(res.headers['cache-control'], 'max-age=42, stale-while-revalidate=3')
    t.equal(res.payload, 'ok')
  })
})

test('reply.cacheControl API (string time)', t => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.cacheControl('max-age', '1d')
    reply.send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.equal(res.statusCode, 200)
    t.equal(res.headers['cache-control'], 'max-age=86400')
    t.equal(res.payload, 'ok')
  })
})
