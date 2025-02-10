'use strict'

const { test } = require('node:test')
const Fastify = require('fastify')
const Sensible = require('../index')

test('request.is API', (t, done) => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.send(req.is('json'))
  })

  fastify.inject({
    method: 'GET',
    url: '/',
    payload: { foo: 'bar' }
  }, (err, res) => {
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.deepStrictEqual(
      res.payload,
      'json'
    )
    done()
  })
})

test('request.is API (with array)', (t, done) => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.send(req.is(['html', 'json']))
  })

  fastify.inject({
    method: 'GET',
    url: '/',
    payload: { foo: 'bar' }
  }, (err, res) => {
    t.assert.ifError(err)
    t.assert.strictEqual(res.statusCode, 200)
    t.assert.deepStrictEqual(
      res.payload,
      'json'
    )
    done()
  })
})
