export declare class HttpError<N extends number = number> extends Error {
  status: N
  statusCode: N
  expose: boolean
  message: string
  headers?: {
    [key: string]: string;
  };

  [key: string]: any;
}

type UnknownError = Error | string | number | { [key: string]: any }

export type HttpErrorTypes = {
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  notAcceptable: 406,
  proxyAuthenticationRequired: 407,
  requestTimeout: 408,
  conflict: 409,
  gone: 410,
  lengthRequired: 411,
  preconditionFailed: 412,
  payloadTooLarge: 413,
  uriTooLong: 414,
  unsupportedMediaType: 415,
  rangeNotSatisfiable: 416,
  expectationFailed: 417,
  imateapot: 418,
  misdirectedRequest: 421,
  unprocessableEntity: 422,
  locked: 423,
  failedDependency: 424,
  tooEarly: 425,
  upgradeRequired: 426,
  preconditionRequired: 428,
  tooManyRequests: 429,
  requestHeaderFieldsTooLarge: 431,
  unavailableForLegalReasons: 451,
  internalServerError: 500,
  notImplemented: 501,
  badGateway: 502,
  serviceUnavailable: 503,
  gatewayTimeout: 504,
  httpVersionNotSupported: 505,
  variantAlsoNegotiates: 506,
  insufficientStorage: 507,
  loopDetected: 508,
  bandwidthLimitExceeded: 509,
  notExtended: 510
  networkAuthenticationRequired: 511
}

type ValueOf<ObjectType, ValueType extends keyof ObjectType = keyof ObjectType> = ObjectType[ValueType]

export type HttpErrorNames = keyof HttpErrorTypes
export type HttpErrorCodes = ValueOf<HttpErrorTypes>
// Permissive type for getHttpError lookups
export type HttpErrorCodesLoose = HttpErrorCodes | `${HttpErrorCodes}`
// Helper to go from stringified error codes back to numeric
type AsCode<T> = T extends `${infer N extends HttpErrorCodes}` ? N : never

export type HttpErrors = {
  HttpError: typeof HttpError;
  getHttpError: <T extends HttpErrorCodesLoose>(code: T, message?: string) => HttpError<AsCode<T>>;
  createError: (...args: UnknownError[]) => HttpError;
} & {
  [Property in keyof HttpErrorTypes]: (...args: UnknownError[]) => HttpError<HttpErrorTypes[Property]>
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
declare const HttpErrors: HttpErrors
export default HttpErrors
