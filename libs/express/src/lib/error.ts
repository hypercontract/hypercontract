import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export function handleNotAcceptable(response: Response, supportedMediaTypes: string[]) {
    return response
        .status(HttpStatus.NOT_ACCEPTABLE)
        .header('Content-Type', supportedMediaTypes.join(', '))
        .send();
}

export function handleNotFound(response: Response) {
    return response
        .status(HttpStatus.NOT_FOUND)
        .send();
}
