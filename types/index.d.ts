import { FastifyPluginCallback, FastifyReply  } from 'fastify'
import { HttpErrors, HttpErrorCodes, HttpErrorNames } from "../lib/httpError"

type FastifySensible = FastifyPluginCallback<fastifySensible.SensibleOptions>

type singleValueTypes = 'must-revalidate' |
  'no-cache' |
  'no-store' |
  'no-transform' |
  'public' |
  'private' |
  'proxy-revalidate' |
  'immutable'

type multiValueTypes = 'max-age' |
  's-maxage' |
  'stale-while-revalidate' |
  'stale-if-error'

type staleTypes = 'while-revalidate' | 'if-error'

type HttpErrorReplys = {
  getHttpError: (code: HttpErrorCodes, message?: string) => FastifyReply;
} & Record<HttpErrorNames, (msg?: string) => FastifyReply>;

declare module 'fastify' {
  namespace SensibleTypes {
    type ToType<T> = [Error, T];
  }

  interface Assert {
    (condition: unknown, code?: number | string, message?: string): asserts condition;
    ok(condition: unknown, code?: number | string, message?: string): asserts condition;
    equal(a: unknown, b: unknown, code?: number | string, message?: string): void;
    notEqual(a: unknown, b: unknown, code?: number | string, message?: string): void;
    strictEqual<T>(a: unknown, b: T, code?: number | string, message?: string): asserts a is T;
    notStrictEqual(a: unknown, b: unknown, code?: number | string, message?: string): void;
    deepEqual(a: unknown, b: unknown, code?: number | string, message?: string): void;
    notDeepEqual(a: unknown, b: unknown, code?: number | string, message?: string): void;
  }

  interface FastifyInstance {
    assert: Assert;
    to<T>(to: Promise<T>): Promise<SensibleTypes.ToType<T>>;
    httpErrors: HttpErrors;
  }

  interface FastifyReply extends HttpErrorReplys {
    vary: {
      (field: string | string[]): void;
      append: (header: string, field: string | string[]) => string;
    };
    cacheControl(type: singleValueTypes): this
    cacheControl(type: multiValueTypes, time: number | string): this
    preventCache(): this
    maxAge(type: number | string): this
    revalidate(): this
    staticCache(time: number | string): this
    stale(type: staleTypes, time: number | string): this
  }

  interface FastifyRequest {
    forwarded(): string[];
    is(types: Array<string>): string | false | null;
    is(...types: Array<string>): string | false | null;
  }
}

declare namespace fastifySensible {
  export interface SensibleOptions {
    /**
     * You can use this option to register a shared JSON Schema you can use in your routes.
     * 
     * @example
     * ```js
     * fastify.register(require('@fastify/sensible'), {
     *   sharedSchemaId: 'httpError'
     * })
     *
     * fastify.get('/async', {
     *   schema: {
     *     response: { 404: { $ref: 'httpError' } }
     *   }
     *   handler: async (req, reply) => {
     *     return reply.notFound()
     *   }
     * })
     * ```
     */
    sharedSchemaId?: string;
  }

  export const fastifySensible: FastifySensible
  export { fastifySensible as default }
}

declare function fastifySensible(...params: Parameters<FastifySensible>): ReturnType<FastifySensible>
export = fastifySensible