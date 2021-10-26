import { expectType, expectAssignable } from 'tsd'
import fastify from 'fastify'
import fastifySensible from '.'

const app = fastify()

app.register(fastifySensible, {
  errorHandler: true
})

app.get('/', (req, reply) => {
  expectAssignable<void>(reply.notFound())
})

app.get('/', (req, reply) => {
  expectAssignable<Error>(app.httpErrors.createError(405, 'Method Not Allowed'))
})

app.get('/', async (req, reply) => {
  expectAssignable<Error>(app.httpErrors.notFound())
})

app.get('/', async (req, reply) => {
  expectType<void>(app.assert.equal(1, 2))
})

app.get('/', async (req, reply) => {
  expectType<Promise<[Error, void]>>(app.to<void>(new Promise(resolve => resolve())))
})
