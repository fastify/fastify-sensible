'use strict'

const { test } = require('node:test')
const Fastify = require('fastify')
const Sensible = require('../index')

test('Should nicely wrap promises (resolve)', (t, done) => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)

    fastify.to(promise(true))
      .then(val => {
        t.assert.ok(Array.isArray(val))
        t.assert.ok(!val[0])
        t.assert.ok(val[1])
        done()
      })
  })
})

test('Should nicely wrap promises (reject)', (t, done) => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)

    fastify.to(promise(false))
      .then(val => {
        t.assert.ok(Array.isArray(val))
        t.assert.ok(val[0])
        t.assert.ok(!val[1])
        done()
      })
  })
})

function promise (bool) {
  return new Promise((resolve, reject) => {
    if (bool) {
      resolve(true)
    } else {
      reject(new Error('kaboom'))
    }
  })
}
