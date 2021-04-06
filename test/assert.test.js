'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const Sensible = require('../index')

test('Should support basic assert', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert(true)
      t.pass('Works correctly')
    } catch (err) {
      t.fail(err)
    }
  })
})

test('Should support ok assert', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert.ok(true)
      t.pass('Works correctly')
    } catch (err) {
      t.fail(err)
    }
  })
})

test('Should support equal assert', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert.equal(1, '1')
      t.pass('Works correctly')
    } catch (err) {
      t.fail(err)
    }
  })
})

test('Should support not equal assert', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert.notEqual(1, '2')
      t.pass('Works correctly')
    } catch (err) {
      t.fail(err)
    }
  })
})

test('Should support strict equal assert', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert.strictEqual(1, 1)
      t.pass('Works correctly')
    } catch (err) {
      t.fail(err)
    }
  })
})

test('Should support not strict equal assert', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert.notStrictEqual(1, 2)
      t.pass('Works correctly')
    } catch (err) {
      t.fail(err)
    }
  })
})

test('Should support deep equal assert', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert.deepEqual({ hello: 'world' }, { hello: 'world' })
      t.pass('Works correctly')
    } catch (err) {
      t.fail(err)
    }
  })
})

test('Should support not deep equal assert', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert.notDeepEqual({ hello: 'world' }, { hello: 'dlrow' })
      t.pass('Works correctly')
    } catch (err) {
      t.fail(err)
    }
  })
})

test('Should support basic assert (throw)', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert(false)
      t.fail('Should throw')
    } catch (err) {
      t.ok(err)
    }
  })
})

test('Should support equal assert (throw)', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert.equal(1, '2')
      t.fail('Should throw')
    } catch (err) {
      t.ok(err)
    }
  })
})

test('Should support not equal assert (throw)', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert.notEqual(1, '1')
      t.fail('Should throw')
    } catch (err) {
      t.ok(err)
    }
  })
})

test('Should support strict equal assert (throw)', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert.equal(1, 2)
      t.fail('Should throw')
    } catch (err) {
      t.ok(err)
    }
  })
})

test('Should support not strict equal assert (throw)', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert.notStrictEqual(1, 1)
      t.fail('Should throw')
    } catch (err) {
      t.ok(err)
    }
  })
})

test('Should support deep equal assert (throw)', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert.deepEqual({ hello: 'world' }, { hello: 'dlrow' })
      t.fail('Should throw')
    } catch (err) {
      t.ok(err)
    }
  })
})

test('Should support not deep equal assert (throw)', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert.notDeepEqual({ hello: 'world' }, { hello: 'world' })
      t.fail('Should throw')
    } catch (err) {
      t.ok(err)
    }
  })
})

test('Should generate the correct http error', t => {
  t.plan(4)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.error(err)
    try {
      fastify.assert(false, 400, 'Wrong!')
      t.fail('Should throw')
    } catch (err) {
      t.equal(err.message, 'Wrong!')
      t.equal(err.name, 'BadRequestError')
      t.equal(err.statusCode, 400)
    }
  })
})
