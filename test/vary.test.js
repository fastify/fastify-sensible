'use strict'

const { test, describe } = require('node:test')
const Fastify = require('fastify')
const Sensible = require('../index')

describe('reply.vary API', () => {
  test('accept string', (t, done) => {
    t.plan(4)

    const fastify = Fastify()
    fastify.register(Sensible)

    fastify.get('/', (_req, reply) => {
      reply.vary('Accept')
      reply.vary('Origin')
      reply.vary('User-Agent')
      reply.send('ok')
    })

    fastify.inject({
      method: 'GET',
      url: '/'
    }, (err, res) => {
      t.assert.ifError(err)
      t.assert.strictEqual(res.statusCode, 200)
      t.assert.strictEqual(res.headers.vary, 'Accept, Origin, User-Agent')
      t.assert.strictEqual(res.payload, 'ok')
      done()
    })
  })

  test('accept array of strings', (t, done) => {
    t.plan(4)

    const fastify = Fastify()
    fastify.register(Sensible)

    fastify.get('/', (_req, reply) => {
      reply.header('Vary', ['Accept', 'Origin'])
      reply.vary('User-Agent')
      reply.send('ok')
    })

    fastify.inject({
      method: 'GET',
      url: '/'
    }, (err, res) => {
      t.assert.ifError(err)
      t.assert.strictEqual(res.statusCode, 200)
      t.assert.strictEqual(res.headers.vary, 'Accept, Origin, User-Agent')
      t.assert.strictEqual(res.payload, 'ok')
      done()
    })
  })
})

test('reply.vary.append API', (t, done) => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (_req, reply) => {
    t.assert.strictEqual(
      reply.vary.append('', ['Accept', 'Accept-Language']), 'Accept, Accept-Language'
    )
    reply.send('ok')
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.strictEqual(res.payload, 'ok')
    done()
  })
})
