import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from 'express';

export function asyncHandler(handler: (request: Request, response: Response, next: NextFunction) => unknown): RequestHandler {
    return (request, response, next) => {
        void Promise.resolve(handler(request, response, next)).catch(next);
    };
}

export function formatResponse(response: Response, formats: Record<string, () => unknown>) {
    let result: unknown;
    const callbacks: Record<string, () => void> = {};
    for (const [mediaType, handler] of Object.entries(formats)) {
        callbacks[mediaType] = () => {
            result = handler();
        };
    }
    response.format(callbacks);
    return result;
}

export const handleUnknownRoute: RequestHandler = (request, response) => {
    response.status(404).json({
        message: `Cannot ${request.method} ${request.originalUrl}`,
        error: 'Not Found',
        statusCode: 404
    });
};

export const handleRequestError: ErrorRequestHandler = (error: unknown, _request, response, next) => {
    if (response.headersSent) {
        return next(error);
    }

    if (error instanceof Error && 'statusCode' in error && typeof error.statusCode === 'number' && error.statusCode >= 400 && error.statusCode < 500) {
        response.status(error.statusCode).json({ statusCode: error.statusCode, message: error.message });
        return;
    }

    console.error(error);
    response.status(500).json({ statusCode: 500, message: 'Internal server error' });
};
