import { RdfDocument } from '@hypercontract/profile';
import { Request, Response } from 'express';
import { isEmpty, trimEnd, values } from 'lodash';
import { Quad } from 'rdf-js';
import { handleNotAcceptable, handleNotFound } from '../error';
import { ProfileStore } from '../profile-store';
import { getRequestUri } from '../request';
import { toJsonLd } from './jsonld';
import { MediaType } from './media-types';
import { toNQuads, toNTriples, toTriG, toTurtle } from './n3';
import { toRdfXml } from './rdflib';

const normalize = (uri: string) => trimEnd(uri, '/');

export function isProfileRequest(request: Request, profileStore: ProfileStore) {
    const requestUri = getRequestUri(request, profileStore);
    return normalize(requestUri) === normalize(profileStore.profileUri);
}

export function isConceptRequest(request: Request, profileStore: ProfileStore) {
    const requestUri = getRequestUri(request, profileStore);
    return normalize(requestUri).startsWith(normalize(profileStore.profileUri));
}

export function handleProfileRequest(request: Request, response: Response, profileStore: ProfileStore) {
    return handleRequest(response, toRdfDocument(
        profileStore.profileUri,
        profileStore.getAll(),
        profileStore
        ));
    }

export function handleConceptRequest(request: Request, response: Response, profileStore: ProfileStore) {
    const requestUri = getRequestUri(request, profileStore);
    return handleRequest(response, toRdfDocument(
        requestUri,
        profileStore.getAllAbout(requestUri),
        profileStore
    ));
}

function handleRequest(response: Response, rdfDocument: RdfDocument) {
    if (isEmpty(rdfDocument.graph)) {
        return handleNotFound(response);
    }

    return response.format({
        [MediaType.JsonLd]: () => toJsonLd(response, rdfDocument),
        [MediaType.RdfXml]: () => toRdfXml(response, rdfDocument),
        [MediaType.Turtle]: () => toTurtle(response, rdfDocument),
        [MediaType.NTriples]: () => toNTriples(response, rdfDocument),
        [MediaType.NQuads]: () => toNQuads(response, rdfDocument),
        [MediaType.TriG]: () => toTriG(response, rdfDocument),
        default: () => handleNotAcceptable(response, values(MediaType))
    });
}

function toRdfDocument(uri: string, graph: Quad[], { defaultNamespace, prefixes, jsonLdContext}: ProfileStore): RdfDocument {
    return {
        uri,
        defaultNamespace,
        prefixes,
        jsonLdContext,
        graph
    };
}
