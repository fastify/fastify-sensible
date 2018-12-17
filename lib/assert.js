/* eslint-disable eqeqeq */
'use strict'

const deepEqual = require('fast-deep-equal')
const getHttpError = require('./httpErrors').getHttpError

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
  assert(deepEqual(a, b) === false, code, message)
}

module.exports = assert
