import { expectType, expectAssignable, expectError, expectNotAssignable } from 'tsd'
import fastify from 'fastify'
import fastifySensible, { FastifySensibleOptions, httpErrors, HttpError } from '..'

const app = fastify()

app.register(fastifySensible)

expectAssignable<FastifySensibleOptions>({})
expectAssignable<FastifySensibleOptions>({ sharedSchemaId: 'HttpError' })
expectNotAssignable<FastifySensibleOptions>({ notSharedSchemaId: 'HttpError' })

app.get('/', (req, reply) => {
  expectAssignable<typeof reply>(reply.badRequest())
  expectAssignable<typeof reply>(reply.unauthorized())
  expectAssignable<typeof reply>(reply.paymentRequired())
  expectAssignable<typeof reply>(reply.forbidden())
  expectAssignable<typeof reply>(reply.notFound())
  expectAssignable<typeof reply>(reply.methodNotAllowed())
  expectAssignable<typeof reply>(reply.notAcceptable())
  expectAssignable<typeof reply>(reply.proxyAuthenticationRequired())
  expectAssignable<typeof reply>(reply.requestTimeout())
  expectAssignable<typeof reply>(reply.gone())
  expectAssignable<typeof reply>(reply.lengthRequired())
  expectAssignable<typeof reply>(reply.preconditionFailed())
  expectAssignable<typeof reply>(reply.payloadTooLarge())
  expectAssignable<typeof reply>(reply.uriTooLong())
  expectAssignable<typeof reply>(reply.unsupportedMediaType())
  expectAssignable<typeof reply>(reply.rangeNotSatisfiable())
  expectAssignable<typeof reply>(reply.expectationFailed())
  expectAssignable<typeof reply>(reply.imateapot())
  expectAssignable<typeof reply>(reply.unprocessableEntity())
  expectAssignable<typeof reply>(reply.locked())
  expectAssignable<typeof reply>(reply.failedDependency())
  expectAssignable<typeof reply>(reply.tooEarly())
  expectAssignable<typeof reply>(reply.upgradeRequired())
  expectAssignable<typeof reply>(reply.preconditionFailed())
  expectAssignable<typeof reply>(reply.tooManyRequests())
  expectAssignable<typeof reply>(reply.requestHeaderFieldsTooLarge())
  expectAssignable<typeof reply>(reply.unavailableForLegalReasons())
  expectAssignable<typeof reply>(reply.internalServerError())
  expectAssignable<typeof reply>(reply.notImplemented())
  expectAssignable<typeof reply>(reply.badGateway())
  expectAssignable<typeof reply>(reply.serviceUnavailable())
  expectAssignable<typeof reply>(reply.gatewayTimeout())
  expectAssignable<typeof reply>(reply.httpVersionNotSupported())
  expectAssignable<typeof reply>(reply.variantAlsoNegotiates())
  expectAssignable<typeof reply>(reply.insufficientStorage())
  expectAssignable<typeof reply>(reply.loopDetected())
  expectAssignable<typeof reply>(reply.bandwidthLimitExceeded())
  expectAssignable<typeof reply>(reply.notExtended())
  expectAssignable<typeof reply>(reply.networkAuthenticationRequired())
})

app.get('/', (req, reply) => {
  expectAssignable<typeof reply>(reply.getHttpError(405, 'Method Not Allowed'))
})

app.get('/', (req, reply) => {
  expectAssignable<HttpError>(app.httpErrors.createError(405, 'Method Not Allowed'))
})

app.get('/', (req, reply) => {
  expectAssignable<HttpError>(
    app.httpErrors.createError(405, 'Method Not Allowed')
  )
  expectAssignable<HttpError>(app.httpErrors.badRequest())
})

app.get('/', async (req, reply) => {
  expectAssignable<HttpError>(app.httpErrors.badRequest())
  expectAssignable<HttpError>(app.httpErrors.unauthorized())
  expectAssignable<HttpError>(app.httpErrors.paymentRequired())
  expectAssignable<HttpError>(app.httpErrors.forbidden())
  expectAssignable<HttpError>(app.httpErrors.notFound())
  expectAssignable<HttpError>(app.httpErrors.methodNotAllowed())
  expectAssignable<HttpError>(app.httpErrors.notAcceptable())
  expectAssignable<HttpError>(app.httpErrors.proxyAuthenticationRequired())
  expectAssignable<HttpError>(app.httpErrors.requestTimeout())
  expectAssignable<HttpError>(app.httpErrors.gone())
  expectAssignable<HttpError>(app.httpErrors.lengthRequired())
  expectAssignable<HttpError>(app.httpErrors.preconditionFailed())
  expectAssignable<HttpError>(app.httpErrors.payloadTooLarge())
  expectAssignable<HttpError>(app.httpErrors.uriTooLong())
  expectAssignable<HttpError>(app.httpErrors.unsupportedMediaType())
  expectAssignable<HttpError>(app.httpErrors.rangeNotSatisfiable())
  expectAssignable<HttpError>(app.httpErrors.expectationFailed())
  expectAssignable<HttpError>(app.httpErrors.imateapot())
  expectAssignable<HttpError>(app.httpErrors.unprocessableEntity())
  expectAssignable<HttpError>(app.httpErrors.locked())
  expectAssignable<HttpError>(app.httpErrors.failedDependency())
  expectAssignable<HttpError>(app.httpErrors.tooEarly())
  expectAssignable<HttpError>(app.httpErrors.upgradeRequired())
  expectAssignable<HttpError>(app.httpErrors.preconditionFailed())
  expectAssignable<HttpError>(app.httpErrors.tooManyRequests())
  expectAssignable<HttpError>(app.httpErrors.requestHeaderFieldsTooLarge())
  expectAssignable<HttpError>(app.httpErrors.unavailableForLegalReasons())
  expectAssignable<HttpError>(app.httpErrors.internalServerError())
  expectAssignable<HttpError>(app.httpErrors.notImplemented())
  expectAssignable<HttpError>(app.httpErrors.badGateway())
  expectAssignable<HttpError>(app.httpErrors.serviceUnavailable())
  expectAssignable<HttpError>(app.httpErrors.gatewayTimeout())
  expectAssignable<HttpError>(app.httpErrors.httpVersionNotSupported())
  expectAssignable<HttpError>(app.httpErrors.variantAlsoNegotiates())
  expectAssignable<HttpError>(app.httpErrors.insufficientStorage())
  expectAssignable<HttpError>(app.httpErrors.loopDetected())
  expectAssignable<HttpError>(app.httpErrors.bandwidthLimitExceeded())
  expectAssignable<HttpError>(app.httpErrors.notExtended())
  expectAssignable<HttpError>(app.httpErrors.networkAuthenticationRequired())
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

httpErrors.forbidden('This type should be also available')
httpErrors.createError('MyError')
