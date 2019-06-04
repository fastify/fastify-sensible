interface Error {
  stack?: string;
}

interface HttpError extends Error {
  status: number;
  statusCode: number;
  expose: boolean;
  headers?: {
      [key: string]: string;
  };
  [key: string]: any;
}

type HttpErrorConstructor = new (msg?: string) => HttpError;

export type HttpErrorType = {
    badRequest(message?: string): HttpError;
    unauthorized(message?: string): HttpError;
    paymentRequired(message?: string): HttpError;
    forbidden(message?: string): HttpError;
    notFound(message?: string): HttpError;
    methodNotAllowed(message?: string): HttpError;
    notAcceptable(message?: string): HttpError;
    proxyAuthenticationRequired(message?: string): HttpError;
    requestTimeout(message?: string): HttpError;
    conflict(message?: string): HttpError;
    gone(message?: string): HttpError;
    lengthRequired(message?: string): HttpError;
    preconditionFailed(message?: string): HttpError;
    payloadTooLarge(message?: string): HttpError;
    uriTooLong(message?: string): HttpError;
    unsupportedMediaType(message?: string): HttpError;
    rangeNotSatisfiable(message?: string): HttpError;
    expectationFailed(message?: string): HttpError;
    imateapot(message?: string): HttpError;
    misdirectedRequest(message?: string): HttpError;
    unprocessableEntity(message?: string): HttpError;
    locked(message?: string): HttpError;
    failedDependency(message?: string): HttpError;
    unorderedCollection(message?: string): HttpError;
    upgradeRequired(message?: string): HttpError;
    preconditionRequired(message?: string): HttpError;
    tooManyRequests(message?: string): HttpError;
    requestHeaderFieldsTooLarge(message?: string): HttpError;
    unavailableForLegalReasons(message?: string): HttpError;
    internalServerError(message?: string): HttpError;
    notImplemented(message?: string): HttpError;
    badGateway(message?: string): HttpError;
    serviceUnavailable(message?: string): HttpError;
    gatewayTimeout(message?: string): HttpError;
    httpVersionNotSupported(message?: string): HttpError;
    variantAlsoNegotiates(message?: string): HttpError;
    insufficientStorage(message?: string): HttpError;
    loopDetected(message?: string): HttpError;
    bandwidthLimitExceeded(message?: string): HttpError;
    notExtended(message?: string): HttpError;
    networkAuthenticationRequired(
      message?: string,
    ): HttpError;

    getHttpError: (code?: number | string, message?: string) => string;
    HttpError: HttpErrorConstructor;
};

export interface HttpErrors {
    httpError: HttpErrorType;
}
