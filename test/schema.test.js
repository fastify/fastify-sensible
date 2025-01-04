'use strict'

const { test } = require('tap')
const statusCodes = require('node:http').STATUS_CODES
const Fastify = require('fastify')
const Sensible = require('../index')

test('Should add shared schema', t => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(Sensible, { sharedSchemaId: 'myError' })

  fastify.get('/', {
    schema: {
      response: {
        400: { $ref: 'myError' }
      }
    },
    handler: (_req, reply) => {
      reply.badRequest()
    }
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    t.equal(res.statusCode, 400)
    t.same(JSON.parse(res.payload), {
      error: statusCodes[400],
      message: statusCodes[400],
      statusCode: 400
    })
  })
})
