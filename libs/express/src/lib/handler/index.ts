import { Response } from 'express';
import { RdfDocument } from '../profile';

export { toJsonLd } from './jsonld';
export { toNQuads, toNTriples, toTriG, toTurtle } from './n3';
export { toRdfXml } from './rdflib';

export type Prefixes = {
    [key: string]: string
};

export type Handler = (response: Response, rdfDocument: RdfDocument) => void;

export type HandlerMapping = {
    [key: string]: Handler
};

