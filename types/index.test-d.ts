import { expectType, expectAssignable, expectError, expectNotAssignable } from 'tsd'
import fastify from 'fastify'
import fastifySensible, { SensibleOptions, httpErrors } from '..'

const app = fastify()

app.register(fastifySensible)

expectAssignable<SensibleOptions>({});
expectAssignable<SensibleOptions>({ sharedSchemaId: 'HttpError' });
expectNotAssignable<SensibleOptions>({ notSharedSchemaId: 'HttpError' });

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

httpErrors.forbidden('This type should be also available');
httpErrors.createError('MyError');
