# @fastify/sensible

[![CI](https://github.com/fastify/fastify-sensible/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/fastify/fastify-sensible/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@fastify/sensible.svg?style=flat)](https://www.npmjs.com/package/@fastify/sensible)
[![neostandard javascript style](https://img.shields.io/badge/code_style-neostandard-brightgreen?style=flat)](https://github.com/neostandard/neostandard)

Defaults for Fastify that everyone can agree on™.<br>
This plugin adds some useful utilities to your Fastify instance, see the API section to learn more.

*Why are these APIs here and not included with Fastify?<br>
Because Fastify aims to be as small and focused as possible, every utility that is not essential should be shipped as a standalone plugin.*

## Install
```
npm i @fastify/sensible
```

### Compatibility

| Plugin version | Fastify version |
| -------------- | --------------- |
| `^6.x`         | `^5.x`          |
| `^5.x`         | `^4.x`          |
| `^4.x`         | `^3.x`          |
| `^2.x`         | `^2.x`          |
| `^1.x`         | `^1.x`          |


Please note that if a Fastify version is out of support, then so are the corresponding versions of this plugin
in the table above.
See [Fastify's LTS policy](https://github.com/fastify/fastify/blob/main/docs/Reference/LTS.md) for more details.

## Usage
```js
const fastify = require('fastify')()
fastify.register(require('@fastify/sensible'))

fastify.get('/', (req, reply) => {
  reply.notFound()
})

fastify.get('/async', async (req, reply) => {
  throw fastify.httpErrors.notFound()
})

fastify.get('/async-return', async (req, reply) => {
  return reply.notFound()
})

fastify.listen({ port: 3000 })
```

## Shared JSON Schema for HTTP errors
If you set the `sharedSchemaId` option, a shared JSON Schema is added and can be used in your routes.
```js
const fastify = require('fastify')()
fastify.register(require('@fastify/sensible'), {
  sharedSchemaId: 'HttpError'
})

fastify.get('/async', {
  schema: {
    response: {
      404: { $ref: 'HttpError' }
    }
  },
  handler: async (req, reply) => {
    return reply.notFound()
  }
})

fastify.listen({ port: 3000 })
```

## API
#### `fastify.httpErrors`
Object that exposes `createError` and all of the `4xx` and `5xx` error constructors.

Use of `4xx` and `5xx` error constructors follows the same structure as [`new createError[code || name]([msg]))`](https://github.com/jshttp/http-errors#new-createerrorcode--namemsg) in [http-errors](https://github.com/jshttp/http-errors):

```js
 // the custom message is optional
const notFoundErr = fastify.httpErrors.notFound('custom message')
```

`4xx`
- <code>fastify.httpErrors.<b>badRequest()</b></code>
- <code>fastify.httpErrors.<b>unauthorized()</b></code>
- <code>fastify.httpErrors.<b>paymentRequired()</b></code>
- <code>fastify.httpErrors.<b>forbidden()</b></code>
- <code>fastify.httpErrors.<b>notFound()</b></code>
- <code>fastify.httpErrors.<b>methodNotAllowed()</b></code>
- <code>fastify.httpErrors.<b>notAcceptable()</b></code>
- <code>fastify.httpErrors.<b>proxyAuthenticationRequired()</b></code>
- <code>fastify.httpErrors.<b>requestTimeout()</b></code>
- <code>fastify.httpErrors.<b>conflict()</b></code>
- <code>fastify.httpErrors.<b>gone()</b></code>
- <code>fastify.httpErrors.<b>lengthRequired()</b></code>
- <code>fastify.httpErrors.<b>preconditionFailed()</b></code>
- <code>fastify.httpErrors.<b>payloadTooLarge()</b></code>
- <code>fastify.httpErrors.<b>uriTooLong()</b></code>
- <code>fastify.httpErrors.<b>unsupportedMediaType()</b></code>
- <code>fastify.httpErrors.<b>rangeNotSatisfiable()</b></code>
- <code>fastify.httpErrors.<b>expectationFailed()</b></code>
- <code>fastify.httpErrors.<b>imateapot()</b></code>
- <code>fastify.httpErrors.<b>misdirectedRequest()</b></code>
- <code>fastify.httpErrors.<b>unprocessableEntity()</b></code>
- <code>fastify.httpErrors.<b>locked()</b></code>
- <code>fastify.httpErrors.<b>failedDependency()</b></code>
- <code>fastify.httpErrors.<b>tooEarly()</b></code>
- <code>fastify.httpErrors.<b>upgradeRequired()</b></code>
- <code>fastify.httpErrors.<b>preconditionRequired()</b></code>
- <code>fastify.httpErrors.<b>tooManyRequests()</b></code>
- <code>fastify.httpErrors.<b>requestHeaderFieldsTooLarge()</b></code>
- <code>fastify.httpErrors.<b>unavailableForLegalReasons()</b></code>

`5xx`
- <code>fastify.httpErrors.<b>internalServerError()</b></code>
- <code>fastify.httpErrors.<b>notImplemented()</b></code>
- <code>fastify.httpErrors.<b>badGateway()</b></code>
- <code>fastify.httpErrors.<b>serviceUnavailable()</b></code>
- <code>fastify.httpErrors.<b>gatewayTimeout()</b></code>
- <code>fastify.httpErrors.<b>httpVersionNotSupported()</b></code>
- <code>fastify.httpErrors.<b>variantAlsoNegotiates()</b></code>
- <code>fastify.httpErrors.<b>insufficientStorage()</b></code>
- <code>fastify.httpErrors.<b>loopDetected()</b></code>
- <code>fastify.httpErrors.<b>bandwidthLimitExceeded()</b></code>
- <code>fastify.httpErrors.<b>notExtended()</b></code>
- <code>fastify.httpErrors.<b>networkAuthenticationRequired()</b></code>

`createError`

Use of `createError` follows the same structure as [`createError([status], [message], [properties])`](https://github.com/jshttp/http-errors#createerrorstatus-message-properties) in [http-errors](https://github.com/jshttp/http-errors):

```js
const err = fastify.httpErrors.createError(404, 'This video does not exist!')
```

#### `reply.[httpError]`
The `reply` interface is decorated with all of the functions declared above, using it is easy:
```js
fastify.get('/', (req, reply) => {
  reply.notFound()
})
```

#### `reply.vary`
The `reply` interface is decorated with [`jshttp/vary`](https://github.com/jshttp/vary), the API is the same, but you do not need to pass the res object.
```js
fastify.get('/', (req, reply) => {
  reply.vary('Accept')
  reply.send('ok')
})
```

#### `reply.cacheControl`
The `reply` interface is decorated with a helper to configure cache control response headers.
```js
// configure a single type
fastify.get('/', (req, reply) => {
  reply.cacheControl('public')
  reply.send('ok')
})

// configure multiple types
fastify.get('/', (req, reply) => {
  reply.cacheControl('public')
  reply.cacheControl('immutable')
  reply.send('ok')
})

// configure a type time
fastify.get('/', (req, reply) => {
  reply.cacheControl('max-age', 42)
  reply.send('ok')
})

// the time can be defined as string
fastify.get('/', (req, reply) => {
  // all the formats of github.com/vercel/ms are supported
  reply.cacheControl('max-age', '1d') // will set to 'max-age=86400'
  reply.send('ok')
})
```

#### `reply.preventCache`
The `reply` interface is decorated with a helper to set the cache control header to a no caching configuration.
```js
fastify.get('/', (req, reply) => {
  // will set cache-control to 'no-store, max-age=0, private'
  // and for HTTP/1.0 compatibility
  // will set pragma to 'no-cache' and expires to 0
  reply.preventCache()
  reply.send('ok')
})
```

#### `reply.revalidate`
The `reply` interface is decorated with a helper to set the cache control header to a no caching configuration.
```js
fastify.get('/', (req, reply) => {
  reply.revalidate() // will set to 'max-age=0, must-revalidate'
  reply.send('ok')
})
```

#### `reply.staticCache`
The `reply` interface is decorated with a helper to set the cache control header to a public and immutable configuration.
```js
fastify.get('/', (req, reply) => {
  // the time can be defined as a string
  reply.staticCache(42) // will set to 'public, max-age=42, immutable'
  reply.send('ok')
})
```

#### `reply.stale`
The `reply` interface is decorated with a helper to set the cache control header for [stale content](https://tools.ietf.org/html/rfc5861).
```js
fastify.get('/', (req, reply) => {
  // the time can be defined as a string
  reply.stale('while-revalidate', 42)
  reply.stale('if-error', 1)
  reply.send('ok')
})
```

#### `reply.maxAge`
The `reply` interface is decorated with a helper to set max age of the response. It can be used in conjunction with `reply.stale`, see [here](https://web.dev/stale-while-revalidate/).
```js
fastify.get('/', (req, reply) => {
  // the time can be defined as a string
  reply.maxAge(86400)
  reply.stale('while-revalidate', 42)
  reply.send('ok')
})
```

#### `request.forwarded`
The `request` interface is decorated with [`jshttp/forwarded`](https://github.com/jshttp/forwarded), the API is the same, but you do not need to pass the request object:
```js
fastify.get('/', (req, reply) => {
  reply.send(req.forwarded())
})
```

#### `request.is`
The `request` interface is decorated with [`jshttp/type-is`](https://github.com/jshttp/type-is), the API is the same but you do not need to pass the request object:
```js
fastify.get('/', (req, reply) => {
  reply.send(req.is(['html', 'json']))
})
```

#### `assert`
Verify if a given condition is true, if not it throws the specified http error.<br> Useful if you work with *async* routes:
```js
// the custom message is optional
fastify.assert(
  req.headers.authorization, 400, 'Missing authorization header'
)
```
The `assert` API also exposes the following methods:
- <code>fastify.assert.<b>ok()</b></code>
- <code>fastify.assert.<b>equal()</b></code>
- <code>fastify.assert.<b>notEqual()</b></code>
- <code>fastify.assert.<b>strictEqual()</b></code>
- <code>fastify.assert.<b>notStrictEqual()</b></code>
- <code>fastify.assert.<b>deepEqual()</b></code>
- <code>fastify.assert.<b>notDeepEqual()</b></code>

#### `to`
Async await wrapper for easy error handling without try-catch, inspired by [`await-to-js`](https://github.com/scopsy/await-to-js):

```js
const [err, user] = await fastify.to(
  db.findOne({ user: 'tyrion' })
)
```

## Contributing
Do you feel there is some utility that *everyone can agree on* that is not present?<br>
Open an issue and let's discuss it! Even better a pull request!

## Acknowledgments

The project name is inspired by [`vim-sensible`](https://github.com/tpope/vim-sensible), an awesome package that if you use vim you should use too.

## License

Licensed under [MIT](./LICENSE).
