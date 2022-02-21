interface HttpError extends Error {
  status: number;
  statusCode: number;
  expose: boolean;
  headers?: {
    [key: string]: string;
  };
  [key: string]: any;
}

type UnknownError = Error | string | number | { [key: string]: any };

type HttpErrorCodes = 400 | '400' // BadRequest
                    | 401 | '401' // Unauthorized
                    | 402 | '402' // PaymentRequired
                    | 403 | '403' // Forbidden
                    | 404 | '404' // NotFound
                    | 405 | '405' // MethodNotAllowed
                    | 406 | '406' // NotAcceptable
                    | 407 | '407' // ProxyAuthenticationRequired
                    | 408 | '408' // RequestTimeout
                    | 409 | '409' // Conflict
                    | 410 | '410' // Gone
                    | 411 | '411' // LengthRequired
                    | 412 | '412' // PreconditionFailed
                    | 413 | '413' // PayloadTooLarge
                    | 414 | '414' // URITooLong
                    | 415 | '415' // UnsupportedMediaType
                    | 416 | '416' // RangeNotSatisfiable
                    | 417 | '417' // ExpectationFailed
                    | 418 | '418' // ImATeapot
                    | 421 | '421' // MisdirectedRequest
                    | 422 | '422' // UnprocessableEntity
                    | 423 | '423' // Locked
                    | 424 | '424' // FailedDependency
                    | 425 | '425' // TooEarly
                    | 426 | '426' // UpgradeRequired
                    | 428 | '428' // PreconditionRequired
                    | 429 | '429' // TooManyRequests
                    | 431 | '431' // RequestHeaderFieldsTooLarge
                    | 451 | '451' // UnavailableForLegalReasons
                    | 500 | '500' // InternalServerError
                    | 501 | '501' // NotImplemented
                    | 502 | '502' // BadGateway
                    | 503 | '503' // ServiceUnavailable
                    | 504 | '504' // GatewayTimeout
                    | 505 | '505' // HTTPVersionNotSupported
                    | 506 | '506' // VariantAlsoNegotiates
                    | 507 | '507' // InsufficientStorage
                    | 508 | '508' // LoopDetected
                    | 509 | '509' // BandwidthLimitExceeded
                    | 510 | '510' // NotExtended
                    | 511 | '511' // NetworkAuthenticationRequire

type HttpErrorNames = 'badRequest'
                    | 'unauthorized'
                    | 'paymentRequired'
                    | 'forbidden'
                    | 'notFound'
                    | 'methodNotAllowed'
                    | 'notAcceptable'
                    | 'proxyAuthenticationRequired'
                    | 'requestTimeout'
                    | 'conflict'
                    | 'gone'
                    | 'lengthRequired'
                    | 'preconditionFailed'
                    | 'payloadTooLarge'
                    | 'uriTooLong'
                    | 'unsupportedMediaType'
                    | 'rangeNotSatisfiable'
                    | 'expectationFailed'
                    | 'imateapot'
                    | 'misdirectedRequest'
                    | 'unprocessableEntity'
                    | 'locked'
                    | 'failedDependency'
                    | 'tooEarly'
                    | 'upgradeRequired'
                    | 'preconditionRequired'
                    | 'tooManyRequests'
                    | 'requestHeaderFieldsTooLarge'
                    | 'unavailableForLegalReasons'
                    | 'internalServerError'
                    | 'notImplemented'
                    | 'badGateway'
                    | 'serviceUnavailable'
                    | 'gatewayTimeout'
                    | 'httpVersionNotSupported'
                    | 'variantAlsoNegotiates'
                    | 'insufficientStorage'
                    | 'loopDetected'
                    | 'bandwidthLimitExceeded'
                    | 'notExtended'
                    | 'networkAuthenticationRequired';

export type HttpErrors = {
  HttpError: HttpError;
  getHttpError: (code: HttpErrorCodes, message?: string) => HttpError;
  createError: (...args: UnknownError[]) => HttpError;
} & Record<HttpErrorNames, (msg?: string) => HttpError>;

export type HttpErrorReplys = {
  getHttpError: (code: HttpErrorCodes, message?: string) => void;
} & Record<HttpErrorNames, (msg?: string) => void>;
