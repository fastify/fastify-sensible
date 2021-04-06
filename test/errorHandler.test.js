'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const Sensible = require('../index')

test('The custom error handler should hide the error message for 500s', t => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.send(new Error('kaboom'))
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.equal(res.statusCode, 500)
    t.same(JSON.parse(res.payload), {
      error: 'Internal Server Error',
      message: 'Something went wrong',
      statusCode: 500
    })
  })
})

test('The custom error handler can be disabled', t => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(Sensible, { errorHandler: false })

  fastify.get('/', (req, reply) => {
    reply.send(new Error('kaboom'))
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.equal(res.statusCode, 500)
    t.same(JSON.parse(res.payload), {
      error: 'Internal Server Error',
      message: 'kaboom',
      statusCode: 500
    })
  })
})

test('The custom error handler should hide the error message for 500s (promise)', t => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    return new Promise((resolve, reject) => {
      reject(new Error('kaboom'))
    })
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.equal(res.statusCode, 500)
    t.same(JSON.parse(res.payload), {
      error: 'Internal Server Error',
      message: 'Something went wrong',
      statusCode: 500
    })
  })
})

test('Should hide only 500s', t => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    reply.code(502).send(new Error('kaboom'))
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.equal(res.statusCode, 502)
    t.same(JSON.parse(res.payload), {
      error: 'Bad Gateway',
      message: 'kaboom',
      statusCode: 502
    })
  })
})

test('Should hide only 500s (promise)', t => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.get('/', (req, reply) => {
    return new Promise((resolve, reject) => {
      reply.code(502)
      reject(new Error('kaboom'))
    })
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.equal(res.statusCode, 502)
    t.same(JSON.parse(res.payload), {
      error: 'Bad Gateway',
      message: 'kaboom',
      statusCode: 502
    })
  })
})

test('Override error handler', t => {
  t.plan(3)

  const fastify = Fastify()
  fastify
    .register(Sensible)
    .after(() => {
      fastify.setErrorHandler(function (error, request, reply) {
        reply.send(error)
      })
    })

  fastify.get('/', (req, reply) => {
    reply.send(new Error('kaboom'))
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.equal(res.statusCode, 500)
    t.same(JSON.parse(res.payload), {
      error: 'Internal Server Error',
      message: 'kaboom',
      statusCode: 500
    })
  })
})
