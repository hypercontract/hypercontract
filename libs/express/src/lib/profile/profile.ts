import { getJsonLdContext, getJsonLdContextUri, ProfileStore, RdfDocument } from '@hypercontract/profile';
import { Quad } from '@rdfjs/types';
import { Request, Response } from 'express';
import { isEmpty, trimEnd, values } from 'lodash';
import { handleNotAcceptable, handleNotFound } from '../error';
import { getRequestUri } from '../request';
import { toHtml } from './html/html';
import { MediaType } from './media-types';
import { toJsonLd } from './rdf/jsonld';
import { toNQuads, toNTriples, toTriG, toTurtle } from './rdf/n3';
import { toRdfXml } from './rdf/rdflib';

const normalize = (uri: string) => trimEnd(uri, '/');

export function isProfileRequest(request: Request, profileStore: ProfileStore) {
    const requestUri = getRequestUri(request, profileStore);
    return normalize(requestUri) === normalize(profileStore.profileUri);
}

export function isConceptRequest(request: Request, profileStore: ProfileStore) {
    const requestUri = getRequestUri(request, profileStore);
    return normalize(requestUri).startsWith(normalize(profileStore.profileUri));
}

export function isContextRequest(request: Request, profileStore: ProfileStore) {
    const requestUri = getRequestUri(request, profileStore);
    const contextUri = getJsonLdContextUri(profileStore);
    return normalize(requestUri) === contextUri;
}

export function handleProfileRequest(request: Request, response: Response, profileStore: ProfileStore) {
    return handleRequest(
        response,
        toRdfDocument(
            profileStore.profileUri,
            profileStore.getAll(),
            profileStore
        ),
        profileStore
    );
}

export function handleConceptRequest(request: Request, response: Response, profileStore: ProfileStore) {
    const requestUri = getRequestUri(request, profileStore);
    return handleRequest(
        response,
        toRdfDocument(
            requestUri,
            profileStore.getAllAbout(requestUri),
            profileStore
        ),
        profileStore
    );
}

export function handleContextRequest(request: Request, response: Response, profileStore: ProfileStore) {
    return response
        .set('Content-Type', MediaType.JsonLd)
        .send(getJsonLdContext(profileStore));
}

function handleRequest(response: Response, rdfDocument: RdfDocument, profileStore: ProfileStore) {
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
        html: () => toHtml(response, rdfDocument, profileStore),
        default: () => handleNotAcceptable(response, values(MediaType), [profileStore.profileUri])
    });
}

function toRdfDocument(uri: string, graph: Quad[], { defaultNamespace, prefixes, jsonLdContext }: ProfileStore): RdfDocument {
    return {
        uri,
        defaultNamespace,
        prefixes,
        jsonLdContext,
        graph
    };
}
