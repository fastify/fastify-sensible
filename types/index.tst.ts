import fastify, { FastifyInstance } from 'fastify'
import fastifySensible, {
  FastifySensibleOptions,
  httpErrors,
  HttpError
} from '..'
import { expect } from 'tstyche'

const app: FastifyInstance = fastify()

app.register(fastifySensible)

expect({}).type.toBeAssignableTo<FastifySensibleOptions>()
expect({
  sharedSchemaId: 'HttpError'
}).type.toBeAssignableTo<FastifySensibleOptions>()
expect({
  sharedSchemaId: undefined
}).type.toBeAssignableTo<FastifySensibleOptions>()

app.get('/', (_req, reply) => {
  expect(reply.badRequest()).type.toBeAssignableTo<typeof reply>()
  expect(reply.unauthorized()).type.toBeAssignableTo<typeof reply>()
  expect(reply.paymentRequired()).type.toBeAssignableTo<typeof reply>()
  expect(reply.forbidden()).type.toBeAssignableTo<typeof reply>()
  expect(reply.notFound()).type.toBeAssignableTo<typeof reply>()
  expect(reply.methodNotAllowed()).type.toBeAssignableTo<typeof reply>()
  expect(reply.notAcceptable()).type.toBeAssignableTo<typeof reply>()
  expect(reply.proxyAuthenticationRequired()).type.toBeAssignableTo<
    typeof reply
  >()
  expect(reply.requestTimeout()).type.toBeAssignableTo<typeof reply>()
  expect(reply.gone()).type.toBeAssignableTo<typeof reply>()
  expect(reply.lengthRequired()).type.toBeAssignableTo<typeof reply>()
  expect(reply.preconditionFailed()).type.toBeAssignableTo<typeof reply>()
  expect(reply.payloadTooLarge()).type.toBeAssignableTo<typeof reply>()
  expect(reply.uriTooLong()).type.toBeAssignableTo<typeof reply>()
  expect(reply.unsupportedMediaType()).type.toBeAssignableTo<typeof reply>()
  expect(reply.rangeNotSatisfiable()).type.toBeAssignableTo<typeof reply>()
  expect(reply.expectationFailed()).type.toBeAssignableTo<typeof reply>()
  expect(reply.imateapot()).type.toBeAssignableTo<typeof reply>()
  expect(reply.unprocessableEntity()).type.toBeAssignableTo<typeof reply>()
  expect(reply.locked()).type.toBeAssignableTo<typeof reply>()
  expect(reply.failedDependency()).type.toBeAssignableTo<typeof reply>()
  expect(reply.tooEarly()).type.toBeAssignableTo<typeof reply>()
  expect(reply.upgradeRequired()).type.toBeAssignableTo<typeof reply>()
  expect(reply.preconditionFailed()).type.toBeAssignableTo<typeof reply>()
  expect(reply.tooManyRequests()).type.toBeAssignableTo<typeof reply>()
  expect(reply.requestHeaderFieldsTooLarge()).type.toBeAssignableTo<
    typeof reply
  >()
  expect(reply.unavailableForLegalReasons()).type.toBeAssignableTo<
    typeof reply
  >()
  expect(reply.internalServerError()).type.toBeAssignableTo<typeof reply>()
  expect(reply.notImplemented()).type.toBeAssignableTo<typeof reply>()
  expect(reply.badGateway()).type.toBeAssignableTo<typeof reply>()
  expect(reply.serviceUnavailable()).type.toBeAssignableTo<typeof reply>()
  expect(reply.gatewayTimeout()).type.toBeAssignableTo<typeof reply>()
  expect(reply.httpVersionNotSupported()).type.toBeAssignableTo<typeof reply>()
  expect(reply.variantAlsoNegotiates()).type.toBeAssignableTo<typeof reply>()
  expect(reply.insufficientStorage()).type.toBeAssignableTo<typeof reply>()
  expect(reply.loopDetected()).type.toBeAssignableTo<typeof reply>()
  expect(reply.bandwidthLimitExceeded()).type.toBeAssignableTo<typeof reply>()
  expect(reply.notExtended()).type.toBeAssignableTo<typeof reply>()
  expect(reply.networkAuthenticationRequired()).type.toBeAssignableTo<
    typeof reply
  >()
})

app.get('/', (_req, reply) => {
  expect(reply.getHttpError(405, 'Method Not Allowed')).type.toBeAssignableTo<
    typeof reply
  >()
  expect(reply.getHttpError('405', 'Method Not Allowed')).type.toBeAssignableTo<
    typeof reply
  >()
})

app.get('/', () => {
  expect(
    app.httpErrors.createError(405, 'Method Not Allowed')
  ).type.toBeAssignableTo<HttpError>()
})

app.get('/', () => {
  expect(
    app.httpErrors.createError(405, 'Method Not Allowed')
  ).type.toBeAssignableTo<HttpError>()
  expect(
    app.httpErrors.createError(405, 'Method Not Allowed')
  ).type.toBeAssignableTo<HttpError>()
  expect(app.httpErrors.badRequest()).type.toBeAssignableTo<HttpError<400>>()
})

app.get('/', async () => {
  expect(app.httpErrors.badRequest()).type.toBeAssignableTo<HttpError<400>>()
  expect(app.httpErrors.unauthorized()).type.toBeAssignableTo<HttpError<401>>()
  expect(app.httpErrors.paymentRequired()).type.toBeAssignableTo<
    HttpError<402>
  >()
  expect(app.httpErrors.forbidden()).type.toBeAssignableTo<HttpError<403>>()
  expect(app.httpErrors.notFound()).type.toBeAssignableTo<HttpError<404>>()
  expect(app.httpErrors.methodNotAllowed()).type.toBeAssignableTo<
    HttpError<405>
  >()
  expect(app.httpErrors.notAcceptable()).type.toBeAssignableTo<
    HttpError<406>
  >()
  expect(app.httpErrors.proxyAuthenticationRequired()).type.toBeAssignableTo<
    HttpError<407>
  >()
  expect(app.httpErrors.requestTimeout()).type.toBeAssignableTo<
    HttpError<408>
  >()
  expect(app.httpErrors.gone()).type.toBeAssignableTo<HttpError<410>>()
  expect(app.httpErrors.lengthRequired()).type.toBeAssignableTo<
    HttpError<411>
  >()
  expect(app.httpErrors.preconditionFailed()).type.toBeAssignableTo<
    HttpError<412>
  >()
  expect(app.httpErrors.payloadTooLarge()).type.toBeAssignableTo<
    HttpError<413>
  >()
  expect(app.httpErrors.uriTooLong()).type.toBeAssignableTo<HttpError<414>>()
  expect(app.httpErrors.unsupportedMediaType()).type.toBeAssignableTo<
    HttpError<415>
  >()
  expect(app.httpErrors.rangeNotSatisfiable()).type.toBeAssignableTo<
    HttpError<416>
  >()
  expect(app.httpErrors.expectationFailed()).type.toBeAssignableTo<
    HttpError<417>
  >()
  expect(app.httpErrors.imateapot()).type.toBeAssignableTo<HttpError<418>>()
  expect(app.httpErrors.unprocessableEntity()).type.toBeAssignableTo<
    HttpError<422>
  >()
  expect(app.httpErrors.locked()).type.toBeAssignableTo<HttpError<423>>()
  expect(app.httpErrors.failedDependency()).type.toBeAssignableTo<
    HttpError<424>
  >()
  expect(app.httpErrors.tooEarly()).type.toBeAssignableTo<HttpError<425>>()
  expect(app.httpErrors.upgradeRequired()).type.toBeAssignableTo<
    HttpError<426>
  >()
  expect(app.httpErrors.tooManyRequests()).type.toBeAssignableTo<
    HttpError<429>
  >()
  expect(app.httpErrors.requestHeaderFieldsTooLarge()).type.toBeAssignableTo<
    HttpError<431>
  >()
  expect(app.httpErrors.unavailableForLegalReasons()).type.toBeAssignableTo<
    HttpError<451>
  >()
  expect(app.httpErrors.internalServerError()).type.toBeAssignableTo<
    HttpError<500>
  >()
  expect(app.httpErrors.notImplemented()).type.toBeAssignableTo<
    HttpError<501>
  >()
  expect(app.httpErrors.badGateway()).type.toBeAssignableTo<HttpError<502>>()
  expect(app.httpErrors.serviceUnavailable()).type.toBeAssignableTo<
    HttpError<503>
  >()
  expect(app.httpErrors.gatewayTimeout()).type.toBeAssignableTo<
    HttpError<504>
  >()
  expect(app.httpErrors.httpVersionNotSupported()).type.toBeAssignableTo<
    HttpError<505>
  >()
  expect(app.httpErrors.variantAlsoNegotiates()).type.toBeAssignableTo<
    HttpError<506>
  >()
  expect(app.httpErrors.insufficientStorage()).type.toBeAssignableTo<
    HttpError<507>
  >()
  expect(app.httpErrors.loopDetected()).type.toBeAssignableTo<HttpError<508>>()
  expect(app.httpErrors.bandwidthLimitExceeded()).type.toBeAssignableTo<
    HttpError<509>
  >()
  expect(app.httpErrors.notExtended()).type.toBeAssignableTo<HttpError<510>>()
  expect(app.httpErrors.networkAuthenticationRequired()).type.toBeAssignableTo<
    HttpError<511>
  >()
})

app.get('/', async () => {
  // @ts-expect-error: Expected 2-3 arguments, but got 1.
  app.assert(true)

  expect(app.assert(1, 400, 'Bad number')).type.toBe<void>()
  expect(app.assert.ok(true, 400)).type.toBe<void>()
  expect(app.assert.equal(1, 1, 400)).type.toBe<void>()
  expect(app.assert.notEqual(1, 2, 400)).type.toBe<void>()
  expect(app.assert.strictEqual(1, 1, 400)).type.toBe<void>()
  expect(app.assert.notStrictEqual(1, 2, 400)).type.toBe<void>()
  expect(app.assert.deepEqual({}, {}, 400)).type.toBe<void>()
  expect(app.assert.notDeepEqual({}, { a: 1 }, 400)).type.toBe<void>()
})

app.get('/', async () => {
  expect(app.to<void>(new Promise((resolve) => resolve()))).type.toBe<
    Promise<[Error, void]>
  >()
})

app.get('/', (_req, reply) => {
  expect(reply.cacheControl('public')).type.toBeAssignableTo<typeof reply>()
})

app.get('/', (_req, reply) => {
  expect(reply.preventCache()).type.toBeAssignableTo<typeof reply>()
})

app.get('/', (_req, reply) => {
  expect(reply.cacheControl('max-age', 42)).type.toBeAssignableTo<
    typeof reply
  >()
})

app.get('/', (_req, reply) => {
  // @ts-expect-error: Argument of type '"foobar"' is not assignable to parameter of type
  reply.cacheControl('foobar')
})

app.get('/', (_req, reply) => {
  expect(reply.stale('while-revalidate', 42)).type.toBeAssignableTo<
    typeof reply
  >()
})

app.get('/', async (_req, reply) => {
  expect(reply.vary('test')).type.toBe<void>()
  expect(reply.vary(['test'])).type.toBe<void>()
  expect(reply.vary.append('X-Header', 'field1')).type.toBe<string>()
  expect(reply.vary.append('X-Header', ['field1'])).type.toBe<string>()
})

app.get('/', async (req) => {
  expect(req.forwarded()).type.toBe<string[]>()
  expect(req.is(['foo', 'bar'])).type.toBe<string | false | null>()
  expect(req.is('foo', 'bar')).type.toBe<string | false | null>()
})

httpErrors.forbidden('This type should be also available')
httpErrors.createError('MyError')
