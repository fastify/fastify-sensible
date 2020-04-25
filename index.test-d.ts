import fastify from 'fastify'
import fastifySensible from '.'

const app = fastify()

app.register(fastifySensible, {
  errorHandler: true
})

app.get('/', (req, reply) => {
  reply.notFound()
})

app.get('/', async (req, reply) => {
  throw app.httpErrors.notFound()
})

app.get('/', async (req, reply) => {
  app.assert.equal(1, 2)
})

app.get('/', async (req, reply) => {
  const [err, res] = await app.to(new Promise(resolve => resolve()))
})