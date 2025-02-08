'use strict'

const { test } = require('node:test')

const Fastify = require('fastify')
const Sensible = require('../index')

test('Should support basic assert', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert.ok(true)
      t.assert.ok('Works correctly')
    } catch (err) {
      t.assert.fail(err)
    }
    done()
  })
})

test('Should support ok assert', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert.ok(true)
      t.assert.ok('Works correctly')
    } catch (err) {
      t.assert.fail(err)
    }
    done()
  })
})

test('Should support equal assert', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert.equal(1, '1')
      t.assert.ok('Works correctly')
    } catch (err) {
      t.assert.fail(err)
    }
    done()
  })
})

test('Should support not equal assert', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert.notEqual(1, '2')
      t.assert.ok('Works correctly')
    } catch (err) {
      t.assert.fail(err)
    }
    done()
  })
})

test('Should support strict equal assert', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert.strictEqual(1, 1)
      t.assert.ok('Works correctly')
    } catch (err) {
      t.assert.fail(err)
    }
    done()
  })
})

test('Should support not strict equal assert', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert.notStrictEqual(1, 2)
      t.assert.ok('Works correctly')
    } catch (err) {
      t.assert.fail(err)
    }
    done()
  })
})

test('Should support deep equal assert', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert.deepEqual({ a: 1 }, { a: 1 })
      t.assert.ok('Works correctly')
    } catch (err) {
      t.assert.fail(err)
    }
    done()
  })
})

test('Should support not deep equal assert', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert.notDeepEqual({ hello: 'world' }, { hello: 'dlrow' })
      t.assert.ok('Works correctly')
    } catch (err) {
      t.assert.fail(err)
    }
    done()
  })
})

test('Should support basic assert (throw)', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert(false)
      t.assert.fail('Should throw')
    } catch (err) {
      t.assert.ok(err)
    }
    done()
  })
})

test('Should support equal assert (throw)', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert.equal(1, '2')
      t.assert.fail('Should throw')
    } catch (err) {
      t.assert.ok(err)
    }
    done()
  })
})

test('Should support not equal assert (throw)', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert.notEqual(1, '1')
      t.assert.fail('Should throw')
    } catch (err) {
      t.assert.ok(err)
    }
    done()
  })
})

test('Should support strict equal assert (throw)', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert.equal(1, 2)
      t.assert.fail('Should throw')
    } catch (err) {
      t.assert.ok(err)
    }
    done()
  })
})

test('Should support not strict equal assert (throw)', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert.notStrictEqual(1, 1)
      t.assert.fail('Should throw')
    } catch (err) {
      t.assert.ok(err)
    }
    done()
  })
})

test('Should support deep equal assert (throw)', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert.deepEqual({ hello: 'world' }, { hello: 'dlrow' })
      t.assert.fail('Should throw')
    } catch (err) {
      t.assert.ok(err)
    }
    done()
  })
})

test('Should support not deep equal assert (throw)', (t, done) => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert.notDeepEqual({ hello: 'world' }, { hello: 'world' })
      t.assert.fail('Should throw')
    } catch (err) {
      t.assert.ok(err)
    }
    done()
  })
})

test('Should generate the correct http error', (t, done) => {
  t.plan(4)
  const fastify = Fastify()
  fastify.register(Sensible)

  fastify.ready(err => {
    t.assert.ifError(err)
    try {
      fastify.assert(false, 400, 'Wrong!')
      t.assert.fail('Should throw')
    } catch (err) {
      t.assert.strictEqual(err.message, 'Wrong!')
      t.assert.strictEqual(err.name, 'BadRequestError')
      t.assert.strictEqual(err.statusCode, 400)
    }
    done()
  })
})
