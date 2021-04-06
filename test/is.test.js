'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const Sensible = require('../index')

test('request.is API', t => {
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
    t.error(err)
    t.equal(res.statusCode, 200)
    t.same(
      res.payload,
      'json'
    )
  })
})

test('request.is API (with array)', t => {
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
    t.error(err)
    t.equal(res.statusCode, 200)
    t.same(
      res.payload,
      'json'
    )
  })
})
