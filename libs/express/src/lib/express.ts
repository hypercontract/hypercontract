import { HttpStatus } from '@nestjs/common';
import { RequestHandler } from 'express';
import { isUndefined, keys } from 'lodash';
import { NamedNode, Quad } from 'rdf-js';
import { HandlerMapping, Prefixes } from './handler';
import { jsonld } from './jsonld';
import { n3 } from './n3';
import { rdfXml } from './rdflib';

const handlerMapping: HandlerMapping = {
    'application/ld+json': jsonld,
    'application/rdf+xml': rdfXml,
    'text/turtle': n3('text/turtle'),
    'application/n-triples': n3('application/n-triples'),
    'application/n-quads': n3('application/n-quads'),
    'application/trig': n3('application/trig')
}

const supportedMediaTypes = keys(handlerMapping);

export function hypercontract(
    document: NamedNode,
    profile: Quad[],
    prefixes: Prefixes = {}
): RequestHandler {
    return (request, response, next) => {
        const requestedMediaType = supportedMediaTypes
            .find(mediaType => request.accepts(mediaType));

        if (isUndefined(requestedMediaType)) {
            return response
                .status(HttpStatus.NOT_ACCEPTABLE)
                .header('Content-Type', supportedMediaTypes.join(', '))
                .send();
        }

        response.type(requestedMediaType);
        return handlerMapping[requestedMediaType](response, document, profile, prefixes);
    }
}
