'use strict'

const inherits = require('util').inherits
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
    return new HttpError('BadRequest', 400, message || 'Bad Request')
  },

  unauthorized: function unauthorized (message) {
    return new HttpError('Unauthorized', 401, message || 'Unauthorized')
  },

  paymentRequired: function paymentRequired (message) {
    return new HttpError('Payment Required', 402, message || 'Payment Required')
  },

  forbidden: function forbidden (message) {
    return new HttpError('Forbidden', 403, message || 'Forbidden')
  },

  notFound: function notFound (message) {
    return new HttpError('NotFound', 404, message || 'Not Found')
  },

  methodNotAllowed: function methodNotAllowed (message) {
    return new HttpError('MethodNotAllowed', 405, message || 'Method Not Allowed')
  },

  notAcceptable: function notAcceptable (message) {
    return new HttpError('NotAcceptable', 406, message || 'Not Acceptable')
  },

  proxyAuthenticationRequired: function proxyAuthenticationRequired (message) {
    return new HttpError('ProxyAuthenticationRequired', 407, message || 'Proxy Authentication Required')
  },

  requestTimeout: function requestTimeout (message) {
    return new HttpError('RequestTimeout', 408, message || 'Request Timeout')
  },

  conflict: function conflict (message) {
    return new HttpError('Conflict', 409, message || 'Conflict')
  },

  gone: function gone (message) {
    return new HttpError('Gone', 410, message || 'Gone')
  },

  lengthRequired: function lengthRequired (message) {
    return new HttpError('LengthRequired', 411, message || 'Length Required')
  },

  preconditionFailed: function preconditionFailed (message) {
    return new HttpError('PreconditionFailed', 412, message || 'Precondition Failed')
  },

  payloadTooLarge: function payloadTooLarge (message) {
    return new HttpError('PayloadTooLarge', 413, message || 'Payload Too Large')
  },

  uriTooLong: function uriTooLong (message) {
    return new HttpError('URITooLong', 414, message || 'URI Too Long')
  },

  unsupportedMediaType: function unsupportedMediaType (message) {
    return new HttpError('UnsupportedMediaType', 415, message || 'Unsupported Media Type')
  },

  rangeNotSatisfiable: function rangeNotSatisfiable (message) {
    return new HttpError('RangeNotSatisfiable', 416, message || 'Range Not Satisfiable')
  },

  expectationFailed: function expectationFailed (message) {
    return new HttpError('ExpectationFailed', 417, message || 'Expectation Failed')
  },

  imateapot: function imateapot (message) {
    return new HttpError('imateapot', 418, message || 'I\'m a teapot')
  },

  misdirectedRequest: function misdirectedRequest (message) {
    return new HttpError('MisdirectedRequest', 421, message || 'Misdirected Request')
  },

  unprocessableEntity: function unprocessableEntity (message) {
    return new HttpError('UnprocessableEntity', 422, message || 'Unprocessable Entity')
  },

  locked: function locked (message) {
    return new HttpError('Locked', 423, message || 'Locked')
  },

  failedDependency: function failedDependency (message) {
    return new HttpError('FailedDependency', 424, message || 'Failed Dependency')
  },

  unorderedCollection: function unorderedCollection (message) {
    return new HttpError('UnorderedCollection', 425, message || 'Unordered Collection')
  },

  upgradeRequired: function upgradeRequired (message) {
    return new HttpError('UpgradeRequired', 426, message || 'Upgrade Required')
  },

  preconditionRequired: function preconditionRequired (message) {
    return new HttpError('PreconditionRequired', 428, message || 'Precondition Required')
  },

  tooManyRequests: function tooManyRequests (message) {
    return new HttpError('TooManyRequests', 429, message || 'Too Many Requests')
  },

  requestHeaderFieldsTooLarge: function requestHeaderFieldsTooLarge (message) {
    return new HttpError('RequestHeaderFieldsTooLarge', 431, message || 'Request Header Fields Too Large')
  },

  unavailableForLegalReasons: function unavailableForLegalReasons (message) {
    return new HttpError('UnavailableForLegalReasons', 451, message || 'Unavailable For Legal Reasons')
  },

  internalServerError: function internalServerError (message) {
    return new HttpError('InternalServerError', 500, message || 'Internal Server Error')
  },

  notImplemented: function notImplemented (message) {
    return new HttpError('NotImplemented', 501, message || 'Not Implemented')
  },

  badGateway: function badGateway (message) {
    return new HttpError('BadGateway', 502, message || 'Bad Gateway')
  },

  serviceUnavailable: function serviceUnavailable (message) {
    return new HttpError('ServiceUnavailable', 503, message || 'Service Unavailable')
  },

  gatewayTimeout: function gatewayTimeout (message) {
    return new HttpError('GatewayTimeout', 504, message || 'Gateway Timeout')
  },

  httpVersionNotSupported: function httpVersionNotSupported (message) {
    return new HttpError('HTTPVersionNotSupported', 505, message || 'HTTP Version Not Supported')
  },

  variantAlsoNegotiates: function variantAlsoNegotiates (message) {
    return new HttpError('VariantAlsoNegotiates', 506, message || 'Variant Also Negotiates')
  },

  insufficientStorage: function insufficientStorage (message) {
    return new HttpError('InsufficientStorage', 507, message || 'Insufficient Storage')
  },

  loopDetected: function loopDetected (message) {
    return new HttpError('LoopDetected', 508, message || 'Loop Detected')
  },

  bandwidthLimitExceeded: function bandwidthLimitExceeded (message) {
    return new HttpError('BandwidthLimitExceeded', 509, message || 'Bandwidth Limit Exceeded')
  },

  notExtended: function notExtended (message) {
    return new HttpError('NotExtended', 510, message || 'Not Extended')
  },

  networkAuthenticationRequired: function networkAuthenticationRequired (message) {
    return new HttpError('NetworkAuthenticationRequired', 511, message || 'Network Authentication Required')
  }
}

function getHttpError (code, message) {
  return httpErrors[statusCodesMap[code + '']](message)
}

function HttpError (name, statusCode, message) {
  Error.call(this)
  Error.captureStackTrace(this, HttpError)
  this.name = name
  this.statusCode = statusCode
  this.message = message
}

inherits(HttpError, Error)

module.exports = httpErrors
module.exports.getHttpError = getHttpError
module.exports.HttpError = HttpError
