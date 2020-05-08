import { FastifyPlugin  } from 'fastify'
import { HttpErrors, HttpErrorReplys } from "./lib/httpError"

declare module 'fastify' {
  namespace SensibleTypes {
    type ToType<T> = [Error, T];
    type Address = "loopback" | "linklocal" | "uniquelocal" | string;
  }

  interface Assert {
    (condition: boolean, code?: number | string, message?: string): string;
    ok(condition: boolean, code?: number | string, message?: string): string;
    equal<T, U>(a: T, b: U, code?: number | string, message?: string): string;
    notEqual<T, U>(
      a: T,
      b: U,
      code?: number | string,
      message?: string
    ): string;
    strictEqual<T, U>(
      a: T,
      b: U,
      code?: number | string,
      message?: string
    ): string;
    notStrictEqual<T, U>(
      a: T,
      b: U,
      code?: number | string,
      message?: string
    ): string;
    deepEqual<T, U>(
      a: T,
      b: U,
      code?: number | string,
      message?: string
    ): string;
    notDeepEqual<T, U>(
      a: T,
      b: U,
      code?: number | string,
      message?: string
    ): string;
  }

  interface FastifyInstance {
    assert: Assert;
    to<T>(to: Promise<T>): Promise<SensibleTypes.ToType<T>>;
    httpErrors: HttpErrors;
  }

  interface FastifyReplyInterface extends HttpErrorReplys {
    vary: {
      (field: string | string[]): void;
      append: (header: string, field: string | string[]) => string;
    };
  }

  interface FastifyRequestInterface {
    forwarded(): string[];
    proxyaddr(
      trust:
        | SensibleTypes.Address
        | SensibleTypes.Address[]
        | ((addr: string, i: number) => boolean)
    ): string;
    is(types: Array<string>): string | false | null;
    is(...types: Array<string>): string | false | null;
  }
}

export interface SensibleOptions {
  errorHandler?: boolean
}

declare const fastifySensible: FastifyPlugin<SensibleOptions>
export default fastifySensible;
