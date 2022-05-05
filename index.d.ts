import { FastifyPlugin  } from 'fastify'
import { HttpErrors, HttpErrorReplys } from "./lib/httpError"

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

export interface SensibleOptions {
  errorHandler?: boolean
}

declare const fastifySensible: FastifyPlugin<SensibleOptions>
export default fastifySensible;
