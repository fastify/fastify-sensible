'use strict'

const createError = require('http-errors')
const statusCodes = require('http').STATUS_CODES

const statusCodesMap = Object.assign({}, statusCodes)
Object.keys(statusCodesMap).forEach(code => {
  statusCodesMap[code] = normalize(code, statusCodesMap[code])
})

function normalize (code, msg) {
  if (code === '414') return 'uriTooLong'
  if (code === '505') return 'httpVersionNotSupported'
  msg = msg.split(' ').join('').replace(/'/g, '')
  msg = msg[0].toLowerCase() + msg.slice(1)
  return msg
}

const httpErrors = {
  badRequest: function badRequest (message) {
    return new createError.BadRequest(message)
  },

  unauthorized: function unauthorized (message) {
    return new createError.Unauthorized(message)
  },

  paymentRequired: function paymentRequired (message) {
    return new createError.PaymentRequired(message)
  },

  forbidden: function forbidden (message) {
    return new createError.Forbidden(message)
  },

  notFound: function notFound (message) {
    return new createError.NotFound(message)
  },

  methodNotAllowed: function methodNotAllowed (message) {
    return new createError.MethodNotAllowed(message)
  },

  notAcceptable: function notAcceptable (message) {
    return new createError.NotAcceptable(message)
  },

  proxyAuthenticationRequired: function proxyAuthenticationRequired (message) {
    return new createError.ProxyAuthenticationRequired(message)
  },

  requestTimeout: function requestTimeout (message) {
    return new createError.RequestTimeout(message)
  },

  conflict: function conflict (message) {
    return new createError.Conflict(message)
  },

  gone: function gone (message) {
    return new createError.Gone(message)
  },

  lengthRequired: function lengthRequired (message) {
    return new createError.LengthRequired(message)
  },

  preconditionFailed: function preconditionFailed (message) {
    return new createError.PreconditionFailed(message)
  },

  payloadTooLarge: function payloadTooLarge (message) {
    return new createError.PayloadTooLarge(message)
  },

  uriTooLong: function uriTooLong (message) {
    return new createError.URITooLong(message)
  },

  unsupportedMediaType: function unsupportedMediaType (message) {
    return new createError.UnsupportedMediaType(message)
  },

  rangeNotSatisfiable: function rangeNotSatisfiable (message) {
    return new createError.RangeNotSatisfiable(message)
  },

  expectationFailed: function expectationFailed (message) {
    return new createError.ExpectationFailed(message)
  },

  imateapot: function imateapot (message) {
    return new createError.ImATeapot(message)
  },

  misdirectedRequest: function misdirectedRequest (message) {
    return new createError.MisdirectedRequest(message)
  },

  unprocessableEntity: function unprocessableEntity (message) {
    return new createError.UnprocessableEntity(message)
  },

  locked: function locked (message) {
    return new createError.Locked(message)
  },

  failedDependency: function failedDependency (message) {
    return new createError.FailedDependency(message)
  },

  tooEarly: function tooEarly (message) {
    return new createError.TooEarly(message)
  },

  upgradeRequired: function upgradeRequired (message) {
    return new createError.UpgradeRequired(message)
  },

  preconditionRequired: function preconditionRequired (message) {
    return new createError.PreconditionRequired(message)
  },

  tooManyRequests: function tooManyRequests (message) {
    return new createError.TooManyRequests(message)
  },

  requestHeaderFieldsTooLarge: function requestHeaderFieldsTooLarge (message) {
    return new createError.RequestHeaderFieldsTooLarge(message)
  },

  unavailableForLegalReasons: function unavailableForLegalReasons (message) {
    return new createError.UnavailableForLegalReasons(message)
  },

  internalServerError: function internalServerError (message) {
    const error = new createError.InternalServerError(message)
    // mark error as explicit to allow custom message
    error.explicitInternalServerError = true
    return error
  },

  notImplemented: function notImplemented (message) {
    return new createError.NotImplemented(message)
  },

  badGateway: function badGateway (message) {
    return new createError.BadGateway(message)
  },

  serviceUnavailable: function serviceUnavailable (message) {
    return new createError.ServiceUnavailable(message)
  },

  gatewayTimeout: function gatewayTimeout (message) {
    return new createError.GatewayTimeout(message)
  },

  httpVersionNotSupported: function httpVersionNotSupported (message) {
    return new createError.HTTPVersionNotSupported(message)
  },

  variantAlsoNegotiates: function variantAlsoNegotiates (message) {
    return new createError.VariantAlsoNegotiates(message)
  },

  insufficientStorage: function insufficientStorage (message) {
    return new createError.InsufficientStorage(message)
  },

  loopDetected: function loopDetected (message) {
    return new createError.LoopDetected(message)
  },

  bandwidthLimitExceeded: function bandwidthLimitExceeded (message) {
    return new createError.BandwidthLimitExceeded(message)
  },

  notExtended: function notExtended (message) {
    return new createError.NotExtended(message)
  },

  networkAuthenticationRequired: function networkAuthenticationRequired (message) {
    return new createError.NetworkAuthenticationRequired(message)
  }
}

function getHttpError (code, message) {
  return httpErrors[statusCodesMap[code + '']](message)
}

module.exports = httpErrors
module.exports.getHttpError = getHttpError
module.exports.HttpError = createError.HttpError
module.exports.createError = createError
