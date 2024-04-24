import { FastifyPluginCallback, FastifyReply  } from 'fastify'
import { HttpErrors } from "../lib/httpError"
import * as Errors from '../lib/httpError'

type FastifySensible = FastifyPluginCallback<fastifySensible.SensibleOptions>

type singleValueTypes =
  | 'must-revalidate'
  | 'no-cache'
  | 'no-store'
  | 'no-transform'
  | 'public'
  | 'private'
  | 'proxy-revalidate'
  | 'immutable'

type multiValueTypes =
  | 'max-age'
  | 's-maxage'
  | 'stale-while-revalidate'
  | 'stale-if-error'

type staleTypes = 'while-revalidate' | 'if-error'

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

  interface FastifyReply extends fastifySensible.HttpErrorReplys {
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
     * This option registers a shared JSON Schema to be used by all response schemas.
     * 
     * @example
     * ```js
     * fastify.register(require('@fastify/sensible'), {
     *   sharedSchemaId: 'HttpError'
     * })
     *
     * fastify.get('/async', {
     *   schema: {
     *     response: { 404: { $ref: 'HttpError' } }
     *   }
     *   handler: async (req, reply) => {
     *     return reply.notFound()
     *   }
     * })
     * ```
     */
    sharedSchemaId?: string;
  }

  export type HttpError = Errors.HttpError;
  export type HttpErrors = Errors.HttpErrors;
  export type HttpErrorCodes = Errors.HttpErrorCodes;
  export type HttpErrorNames = Errors.HttpErrorNames;

  export const httpErrors: typeof Errors.default

  export type HttpErrorReplys = {
    getHttpError: (code: HttpErrorCodes, message?: string) => FastifyReply;
  } & Record<HttpErrorNames, (msg?: string) => FastifyReply>

  export const fastifySensible: FastifySensible
  export { fastifySensible as default }
}

declare function fastifySensible(...params: Parameters<FastifySensible>): ReturnType<FastifySensible>
export = fastifySensible
