import { expectType, expectAssignable, expectError } from 'tsd'
import fastify from 'fastify'
import fastifySensible from '.'

const app = fastify()

app.register(fastifySensible, {
  errorHandler: true
})

app.get('/', (req, reply) => {
  expectAssignable<void>(reply.badRequest())
  expectAssignable<void>(reply.unauthorized())
  expectAssignable<void>(reply.paymentRequired())
  expectAssignable<void>(reply.forbidden())
  expectAssignable<void>(reply.notFound())
  expectAssignable<void>(reply.methodNotAllowed())
  expectAssignable<void>(reply.notAcceptable())
  expectAssignable<void>(reply.proxyAuthenticationRequired())
  expectAssignable<void>(reply.requestTimeout())
  expectAssignable<void>(reply.gone())
  expectAssignable<void>(reply.lengthRequired())
  expectAssignable<void>(reply.preconditionFailed())
  expectAssignable<void>(reply.payloadTooLarge())
  expectAssignable<void>(reply.uriTooLong())
  expectAssignable<void>(reply.unsupportedMediaType())
  expectAssignable<void>(reply.rangeNotSatisfiable())
  expectAssignable<void>(reply.expectationFailed())
  expectAssignable<void>(reply.imateapot())
  expectAssignable<void>(reply.unprocessableEntity())
  expectAssignable<void>(reply.locked())
  expectAssignable<void>(reply.failedDependency())
  expectAssignable<void>(reply.tooEarly())
  expectAssignable<void>(reply.upgradeRequired())
  expectAssignable<void>(reply.preconditionFailed())
  expectAssignable<void>(reply.tooManyRequests())
  expectAssignable<void>(reply.requestHeaderFieldsTooLarge())
  expectAssignable<void>(reply.unavailableForLegalReasons())
  expectAssignable<void>(reply.internalServerError())
  expectAssignable<void>(reply.notImplemented())
  expectAssignable<void>(reply.badGateway())
  expectAssignable<void>(reply.serviceUnavailable())
  expectAssignable<void>(reply.gatewayTimeout())
  expectAssignable<void>(reply.httpVersionNotSupported())
  expectAssignable<void>(reply.variantAlsoNegotiates())
  expectAssignable<void>(reply.insufficientStorage())
  expectAssignable<void>(reply.loopDetected())
  expectAssignable<void>(reply.bandwidthLimitExceeded())
  expectAssignable<void>(reply.notExtended())
  expectAssignable<void>(reply.networkAuthenticationRequired())
})

app.get('/', (req, reply) => {
  expectAssignable<void>(reply.getHttpError(405, 'Method Not Allowed'))
})

app.get('/', (req, reply) => {
  expectAssignable<Error>(app.httpErrors.createError(405, 'Method Not Allowed'))
})

app.get('/', async (req, reply) => {
  expectAssignable<Error>(app.httpErrors.badRequest())
  expectAssignable<Error>(app.httpErrors.unauthorized())
  expectAssignable<Error>(app.httpErrors.paymentRequired())
  expectAssignable<Error>(app.httpErrors.forbidden())
  expectAssignable<Error>(app.httpErrors.notFound())
  expectAssignable<Error>(app.httpErrors.methodNotAllowed())
  expectAssignable<Error>(app.httpErrors.notAcceptable())
  expectAssignable<Error>(app.httpErrors.proxyAuthenticationRequired())
  expectAssignable<Error>(app.httpErrors.requestTimeout())
  expectAssignable<Error>(app.httpErrors.gone())
  expectAssignable<Error>(app.httpErrors.lengthRequired())
  expectAssignable<Error>(app.httpErrors.preconditionFailed())
  expectAssignable<Error>(app.httpErrors.payloadTooLarge())
  expectAssignable<Error>(app.httpErrors.uriTooLong())
  expectAssignable<Error>(app.httpErrors.unsupportedMediaType())
  expectAssignable<Error>(app.httpErrors.rangeNotSatisfiable())
  expectAssignable<Error>(app.httpErrors.expectationFailed())
  expectAssignable<Error>(app.httpErrors.imateapot())
  expectAssignable<Error>(app.httpErrors.unprocessableEntity())
  expectAssignable<Error>(app.httpErrors.locked())
  expectAssignable<Error>(app.httpErrors.failedDependency())
  expectAssignable<Error>(app.httpErrors.tooEarly())
  expectAssignable<Error>(app.httpErrors.upgradeRequired())
  expectAssignable<Error>(app.httpErrors.preconditionFailed())
  expectAssignable<Error>(app.httpErrors.tooManyRequests())
  expectAssignable<Error>(app.httpErrors.requestHeaderFieldsTooLarge())
  expectAssignable<Error>(app.httpErrors.unavailableForLegalReasons())
  expectAssignable<Error>(app.httpErrors.internalServerError())
  expectAssignable<Error>(app.httpErrors.notImplemented())
  expectAssignable<Error>(app.httpErrors.badGateway())
  expectAssignable<Error>(app.httpErrors.serviceUnavailable())
  expectAssignable<Error>(app.httpErrors.gatewayTimeout())
  expectAssignable<Error>(app.httpErrors.httpVersionNotSupported())
  expectAssignable<Error>(app.httpErrors.variantAlsoNegotiates())
  expectAssignable<Error>(app.httpErrors.insufficientStorage())
  expectAssignable<Error>(app.httpErrors.loopDetected())
  expectAssignable<Error>(app.httpErrors.bandwidthLimitExceeded())
  expectAssignable<Error>(app.httpErrors.notExtended())
  expectAssignable<Error>(app.httpErrors.networkAuthenticationRequired())
})

app.get('/', async (req, reply) => {
  expectType<void>(app.assert(1))
  expectType<void>(app.assert.ok(true))
  expectType<void>(app.assert.equal(1, 1))
  expectType<void>(app.assert.notEqual(1, 2))
  expectType<void>(app.assert.strictEqual(1, 1))
  expectType<void>(app.assert.notStrictEqual(1, 2))
  expectType<void>(app.assert.deepEqual({}, {}))
  expectType<void>(app.assert.notDeepEqual({}, { a: 1 }))
})

app.get('/', async (req, reply) => {
  expectType<Promise<[Error, void]>>(app.to<void>(new Promise(resolve => resolve())))
})

app.get('/', (req, reply) => {
  expectAssignable<typeof reply>(reply.cacheControl('public'))
})

app.get('/', (req, reply) => {
  expectAssignable<typeof reply>(reply.preventCache())
})

app.get('/', (req, reply) => {
  expectAssignable<typeof reply>(reply.cacheControl('max-age', 42))
})

app.get('/', (req, reply) => {
  expectError(reply.cacheControl('foobar'))
})

app.get('/', (req, reply) => {
  expectAssignable<typeof reply>(reply.stale('while-revalidate', 42))
})

app.get('/', async (req, reply) => {
  expectType<void>(reply.vary('test'))
  expectType<void>(reply.vary(['test']))
  expectType<string>(reply.vary.append('X-Header', 'field1'))
  expectType<string>(reply.vary.append('X-Header', ['field1']))
})

app.get('/', async (req, reply) => {
  expectType<string[]>(req.forwarded())
  expectType<string | false | null>(req.is(['foo', 'bar']))
  expectType<string | false | null>(req.is('foo', 'bar'))
})