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

app.get('/', async (req, reply) => {
  expectAssignable<Error>(app.httpErrors.notFound())
})

app.get('/', async (req, reply) => {
  expectType<string>(app.assert.equal(1, 2))
})

app.get('/', async (req, reply) => {
  expectType<Promise<[Error, void]>>(app.to<void>(new Promise(resolve => resolve())))
})