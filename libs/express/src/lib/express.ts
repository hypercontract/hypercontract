import { Profile, RdfDocument } from '@hypercontract/profile';
import { HttpStatus } from '@nestjs/common';
import { Request, RequestHandler, Response } from 'express';
import { isEmpty, memoize, trimEnd, values } from 'lodash';
import { DataFactory, Store } from 'n3';
import { Quad } from 'rdf-js';
import { toJsonLd, toNQuads, toNTriples, toRdfXml, toTriG, toTurtle } from './handler';
import { MediaType } from './media-types';

export function hypercontract(profile: Profile): RequestHandler {
    return (request, response) => {
        const rdfDocument: RdfDocument = getRdfDocumentForRequest(request, profile);

        if (isEmpty(rdfDocument.graph)) {
            handleNotFound(response);
        }

        response.format({
            [MediaType.JsonLd]: () => toJsonLd(response, rdfDocument),
            [MediaType.RdfXml]: () => toRdfXml(response, rdfDocument),
            [MediaType.Turtle]: () => toTurtle(response, rdfDocument),
            [MediaType.NTriples]: () => toNTriples(response, rdfDocument),
            [MediaType.NQuads]: () => toNQuads(response, rdfDocument),
            [MediaType.TriG]: () => toTriG(response, rdfDocument),
            default: () => handleNotAcceptable(response)
        })
    }
}

function handleNotAcceptable(response: Response) {
    response
        .status(HttpStatus.NOT_ACCEPTABLE)
        .header('Content-Type', values(MediaType).join(', '))
        .send()
}

function handleNotFound(response: Response) {
    response
        .status(HttpStatus.NOT_FOUND)
        .send()
}

function getRdfDocumentForRequest(request: Request, profile: Profile): RdfDocument {
    if (isProfileRequest(request, profile)) {
        return profile;
    }

    const uri = getRdfDocumentUri(request, profile);
    const graph = getRdfDocumentGraph(uri, profile);

    return {
        ...profile,
        uri,
        graph
    };
}

function isProfileRequest(request: Request, profile: Profile) {
    const normalizedProfileUri = trimEnd(profile.uri, '/');
    const normalizedRequestPath = trimEnd(request.originalUrl, '/');
    return normalizedProfileUri.endsWith(normalizedRequestPath);
}

function getRdfDocumentUri(request: Request, profile: Profile) {
    const documentUri = new URL(profile.uri);
    documentUri.pathname = request.originalUrl;
    return documentUri.toString();
}

const getStoreForProfile = memoize((profile: Profile) => new Store(profile.graph));

function getRdfDocumentGraph(rdfDocumentUri: string, profile: Profile): Quad[] {
    const store = getStoreForProfile(profile);
    const conceptNode = DataFactory.namedNode(rdfDocumentUri);
    return [
        ...store.getQuads(conceptNode, null, null, null),
        ...store.getQuads(null, conceptNode, null, null),
        ...store.getQuads(null, null, conceptNode, null)
    ];
}
