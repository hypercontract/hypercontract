import { RdfDocument } from '@hypercontract/profile';
import { Response } from 'express';

export type Handler = (response: Response, rdfDocument: RdfDocument) => void;

export type HandlerMapping = {
    [key: string]: Handler;
};
