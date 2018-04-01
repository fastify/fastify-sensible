'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const Sensible = require('../index')

test('Should nicely wrap promises (resolve)', t => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)

    fastify.to(promise(true))
      .then(val => {
        t.ok(Array.isArray(val))
        t.notOk(val[0])
        t.ok(val[1])
      })
  })
})

test('Should nicely wrap promises (reject)', t => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)

    fastify.to(promise(false))
      .then(val => {
        t.ok(Array.isArray(val))
        t.ok(val[0])
        t.notOk(val[1])
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
