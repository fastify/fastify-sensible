'use strict'

const { test } = require('node:test')
const Fastify = require('fastify')
const Sensible = require('../index')

test('reply.cacheControl API', (t, done) => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (_req, reply) => {
    reply.cacheControl('public')
    reply.send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.strictEqual(res.headers['cache-control'], 'public')
    t.assert.strictEqual(res.payload, 'ok')
    done()
  })
})

test('reply.cacheControl API (multiple values)', (t, done) => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (_req, reply) => {
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
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.strictEqual(res.headers['cache-control'], 'public, max-age=604800, immutable')
    t.assert.strictEqual(res.payload, 'ok')
    done()
  })
})

test('reply.preventCache API', (t, done) => {
  t.plan(6)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (_req, reply) => {
    reply.preventCache().send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.strictEqual(res.headers['cache-control'], 'no-store, max-age=0, private')
    t.assert.strictEqual(res.headers.pragma, 'no-cache')
    t.assert.strictEqual(res.headers.expires, '0')
    t.assert.strictEqual(res.payload, 'ok')
    done()
  })
})

test('reply.stale API', (t, done) => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (_req, reply) => {
    reply.stale('while-revalidate', 42).send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.strictEqual(res.headers['cache-control'], 'stale-while-revalidate=42')
    t.assert.strictEqual(res.payload, 'ok')
    done()
  })
})

test('reply.stale API (multiple values)', (t, done) => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (_req, reply) => {
    reply
      .stale('while-revalidate', 42)
      .stale('if-error', 1)
      .send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.strictEqual(res.headers['cache-control'], 'stale-while-revalidate=42, stale-if-error=1')
    t.assert.strictEqual(res.payload, 'ok')
    done()
  })
})

test('reply.stale API (bad value)', (t, done) => {
  t.plan(5)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (_req, reply) => {
    try {
      reply.stale('foo', 42).send('ok')
      t.assert.fail('Should throw')
    } catch (err) {
      t.assert.ok(err)
      reply.send('ok')
    }
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.ok(!res.headers['cache-control'])
    t.assert.strictEqual(res.payload, 'ok')
    done()
  })
})

test('reply.revalidate API', (t, done) => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (_req, reply) => {
    reply.revalidate().send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.strictEqual(res.headers['cache-control'], 'max-age=0, must-revalidate')
    t.assert.strictEqual(res.payload, 'ok')
    done()
  })
})

test('reply.staticCache API', (t, done) => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (_req, reply) => {
    reply.staticCache(42).send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.strictEqual(res.headers['cache-control'], 'public, max-age=42, immutable')
    t.assert.strictEqual(res.payload, 'ok')
    done()
  })
})

test('reply.staticCache API (as string)', (t, done) => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (_req, reply) => {
    reply.staticCache('42s').send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.strictEqual(res.headers['cache-control'], 'public, max-age=42, immutable')
    t.assert.strictEqual(res.payload, 'ok')
    done()
  })
})

test('reply.maxAge and reply.stale API', (t, done) => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (_req, reply) => {
    reply
      .maxAge(42)
      .stale('while-revalidate', 3)
      .send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.strictEqual(res.headers['cache-control'], 'max-age=42, stale-while-revalidate=3')
    t.assert.strictEqual(res.payload, 'ok')
    done()
  })
})

test('reply.cacheControl API (string time)', (t, done) => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (_req, reply) => {
    reply.cacheControl('max-age', '1d')
    reply.send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.strictEqual(res.headers['cache-control'], 'max-age=86400')
    t.assert.strictEqual(res.payload, 'ok')
    done()
  })
})
