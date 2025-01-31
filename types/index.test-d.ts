import { expectType, expectAssignable, expectError, expectNotAssignable } from 'tsd'
import fastify from 'fastify'
import fastifySensible, { FastifySensibleOptions, httpErrors, HttpError } from '..'

const app = fastify()

app.register(fastifySensible)

expectAssignable<FastifySensibleOptions>({})
expectAssignable<FastifySensibleOptions>({ sharedSchemaId: 'HttpError' })
expectAssignable<FastifySensibleOptions>({ sharedSchemaId: undefined })
expectNotAssignable<FastifySensibleOptions>({ notSharedSchemaId: 'HttpError' })

app.get('/', (_req, reply) => {
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

app.get('/', (_req, reply) => {
  expectAssignable<typeof reply>(reply.getHttpError(405, 'Method Not Allowed'))
  expectAssignable<typeof reply>(reply.getHttpError('405', 'Method Not Allowed'))
})

app.get('/', () => {
  expectAssignable<HttpError>(app.httpErrors.createError(405, 'Method Not Allowed'))
})

app.get('/', () => {
  expectAssignable<HttpError>(
    app.httpErrors.createError(405, 'Method Not Allowed')
  )
  expectAssignable<HttpError>(
    app.httpErrors.createError(405, 'Method Not Allowed')
  )
  expectAssignable<HttpError<400>>(app.httpErrors.badRequest())
})

app.get('/', async () => {
  expectAssignable<HttpError<400>>(app.httpErrors.badRequest())
  expectAssignable<HttpError<401>>(app.httpErrors.unauthorized())
  expectAssignable<HttpError<402>>(app.httpErrors.paymentRequired())
  expectAssignable<HttpError<403>>(app.httpErrors.forbidden())
  expectAssignable<HttpError<404>>(app.httpErrors.notFound())
  expectAssignable<HttpError<405>>(app.httpErrors.methodNotAllowed())
  expectAssignable<HttpError<406>>(app.httpErrors.notAcceptable())
  expectAssignable<HttpError<407>>(app.httpErrors.proxyAuthenticationRequired())
  expectAssignable<HttpError<408>>(app.httpErrors.requestTimeout())
  expectAssignable<HttpError<410>>(app.httpErrors.gone())
  expectAssignable<HttpError<411>>(app.httpErrors.lengthRequired())
  expectAssignable<HttpError<412>>(app.httpErrors.preconditionFailed())
  expectAssignable<HttpError<413>>(app.httpErrors.payloadTooLarge())
  expectAssignable<HttpError<414>>(app.httpErrors.uriTooLong())
  expectAssignable<HttpError<415>>(app.httpErrors.unsupportedMediaType())
  expectAssignable<HttpError<416>>(app.httpErrors.rangeNotSatisfiable())
  expectAssignable<HttpError<417>>(app.httpErrors.expectationFailed())
  expectAssignable<HttpError<418>>(app.httpErrors.imateapot())
  expectAssignable<HttpError<422>>(app.httpErrors.unprocessableEntity())
  expectAssignable<HttpError<423>>(app.httpErrors.locked())
  expectAssignable<HttpError<424>>(app.httpErrors.failedDependency())
  expectAssignable<HttpError<425>>(app.httpErrors.tooEarly())
  expectAssignable<HttpError<426>>(app.httpErrors.upgradeRequired())
  expectAssignable<HttpError<429>>(app.httpErrors.tooManyRequests())
  expectAssignable<HttpError<431>>(app.httpErrors.requestHeaderFieldsTooLarge())
  expectAssignable<HttpError<451>>(app.httpErrors.unavailableForLegalReasons())
  expectAssignable<HttpError<500>>(app.httpErrors.internalServerError())
  expectAssignable<HttpError<501>>(app.httpErrors.notImplemented())
  expectAssignable<HttpError<502>>(app.httpErrors.badGateway())
  expectAssignable<HttpError<503>>(app.httpErrors.serviceUnavailable())
  expectAssignable<HttpError<504>>(app.httpErrors.gatewayTimeout())
  expectAssignable<HttpError<505>>(app.httpErrors.httpVersionNotSupported())
  expectAssignable<HttpError<506>>(app.httpErrors.variantAlsoNegotiates())
  expectAssignable<HttpError<507>>(app.httpErrors.insufficientStorage())
  expectAssignable<HttpError<508>>(app.httpErrors.loopDetected())
  expectAssignable<HttpError<509>>(app.httpErrors.bandwidthLimitExceeded())
  expectAssignable<HttpError<510>>(app.httpErrors.notExtended())
  expectAssignable<HttpError<511>>(app.httpErrors.networkAuthenticationRequired())
})

app.get('/', async () => {
  expectType<void>(app.assert(1))
  expectType<void>(app.assert.ok(true))
  expectType<void>(app.assert.equal(1, 1))
  expectType<void>(app.assert.notEqual(1, 2))
  expectType<void>(app.assert.strictEqual(1, 1))
  expectType<void>(app.assert.notStrictEqual(1, 2))
  expectType<void>(app.assert.deepEqual({}, {}))
  expectType<void>(app.assert.notDeepEqual({}, { a: 1 }))
})

app.get('/', async () => {
  expectType<Promise<[Error, void]>>(app.to<void>(new Promise(resolve => resolve())))
})

app.get('/', (_req, reply) => {
  expectAssignable<typeof reply>(reply.cacheControl('public'))
})

app.get('/', (_req, reply) => {
  expectAssignable<typeof reply>(reply.preventCache())
})

app.get('/', (_req, reply) => {
  expectAssignable<typeof reply>(reply.cacheControl('max-age', 42))
})

app.get('/', (_req, reply) => {
  expectError(reply.cacheControl('foobar'))
})

app.get('/', (_req, reply) => {
  expectAssignable<typeof reply>(reply.stale('while-revalidate', 42))
})

app.get('/', async (_req, reply) => {
  expectType<void>(reply.vary('test'))
  expectType<void>(reply.vary(['test']))
  expectType<string>(reply.vary.append('X-Header', 'field1'))
  expectType<string>(reply.vary.append('X-Header', ['field1']))
})

app.get('/', async (req) => {
  expectType<string[]>(req.forwarded())
  expectType<string | false | null>(req.is(['foo', 'bar']))
  expectType<string | false | null>(req.is('foo', 'bar'))
})

httpErrors.forbidden('This type should be also available')
httpErrors.createError('MyError')
