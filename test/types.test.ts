import * as fastify from "fastify";
import * as fastifySensible from "..";

const app = fastify();

app.register(fastifySensible);

// 'assert' types test
app.ready(err => {
  try {
    app.assert(true);
    app.assert(true, 400);
    app.assert(true, "400");
    app.assert(true, 400, "Bad request");
  } catch (err) {
    throw err;
  }
});

app.ready(err => {
  try {
    app.assert.ok(true);
    app.assert.ok(true, 400);
    app.assert.ok(true, "400");
    app.assert.ok(true, 400, "Bad request");
  } catch (err) {
    throw err;
  }
});

app.ready(err => {
  try {
    app.assert.equal(1, "1");
  } catch (err) {
    throw err;
  }
});

app.ready(err => {
  try {
    app.assert.notEqual(1, "2");
  } catch (err) {
    throw err;
  }
});

app.ready(err => {
  try {
    app.assert.strictEqual(1, 1);
  } catch (err) {
    throw err;
  }
});

app.ready(err => {
  try {
    app.assert.notStrictEqual(1, 2);
  } catch (err) {
    throw err;
  }
});

app.ready(err => {
  try {
    app.assert.deepEqual({ hello: "world" }, { hello: "world" });
  } catch (err) {
    throw err;
  }
});

app.ready(err => {
  try {
    app.assert.notDeepEqual({ hello: "world" }, { hello: "dlrow" });
  } catch (err) {
    throw err;
  }
});

app.ready(err => {
  try {
    app.assert.deepEqual({ hello: "world" }, { hello: "world" });
  } catch (err) {
    throw err;
  }
});

app.ready(err => {
  try {
    app.assert.deepEqual({ hello: "world" }, { hello: "world" });
  } catch (err) {
    throw err;
  }
});

// 'errorHandler' types test
app.get("/", (req, reply) => {
  reply.send(new Error("kaboom"));
});

// 'forwarded' types test
app.get("/", (req, reply) => {
  reply.send(req.forwarded());
});

// 'httpError' types test
app.addHook("preHandler", async (request, reply) => {
  try {
    await app.httpErrors.getHttpError(400);
    await app.httpErrors.badGateway();
  } catch {
    const err = app.httpErrors["imateapot"]("custom");
    reply.send(err);
  }
});

app.addHook("onError", (request, reply, error, next) => {
  const err = app.httpErrors["imateapot"]("custom");
  reply.send(err);
});

// 'is' types test
app.get("/", (req, reply) => {
  reply.send(req.is("json"));
});

app.get("/", (req, reply) => {
  reply.send(req.is(["html", "json"]));
});

// 'proxyaddr' types test
app.get("/", (req, reply) => {
  reply.send(req.proxyaddr(addr => addr === "127.0.0.1"));
});

app.get("/test", (req, reply) => {
  reply.send(req.proxyaddr(["127.0.0.0/8", "10.0.0.0/8"]));
});

// 'to' types test
app.ready(err => {
  app.to(promise(true)).then(val => {});
});

function promise(bool: boolean) {
  return new Promise((resolve, reject) => {
    if (bool) {
      resolve(true);
    } else {
      reject(new Error("kaboom"));
    }
  });
}

// 'vary' types test
app.get("/", (req, reply) => {
  reply.vary("Accept");
  reply.vary("Origin");
  reply.vary("User-Agent");
  reply.send("ok");
});

app.get("/", (req, reply) => {
  app.assert.strictEqual(
    reply.vary.append("", ["Accept", "Accept-Language"]),
    "Accept, Accept-Language"
  );
  reply.send("ok");
});
