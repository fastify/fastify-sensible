/* eslint-disable eqeqeq */
'use strict'

const { dequal: deepEqual } = require('dequal')
const { getHttpError } = require('./httpErrors')

function assert (condition, code, message) {
  if (condition) return
  throw getHttpError(code, message)
}

assert.ok = assert

assert.equal = function (a, b, code, message) {
  assert(a == b, code, message)
}

assert.notEqual = function (a, b, code, message) {
  assert(a != b, code, message)
}

assert.strictEqual = function (a, b, code, message) {
  assert(a === b, code, message)
}

assert.notStrictEqual = function (a, b, code, message) {
  assert(a !== b, code, message)
}

assert.deepEqual = function (a, b, code, message) {
  assert(deepEqual(a, b), code, message)
}

assert.notDeepEqual = function (a, b, code, message) {
  assert(!deepEqual(a, b), code, message)
}

module.exports = assert
