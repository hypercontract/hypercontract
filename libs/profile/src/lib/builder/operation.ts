import RDF from '@rdfjs/data-model';
import { isEmpty, isUndefined } from 'lodash';
import { hyper, rdf } from '../namespaces';
import { Statement } from '../profile';
import { toQuads } from './quad';
import { stateTransition, StateTransition } from './state-transition';

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

export interface Operation extends StateTransition {
    method: HttpMethod;
    expectedBody?: string;
    expectedQueryParams?: string;
    constraints?: string[];
    returnedType?: string;
}

export const operation = (uri: string, definition: Operation) => [
    ...stateTransition(uri, definition),
    ...toQuads(
        [RDF.namedNode(uri), RDF.namedNode(rdf('type')), RDF.namedNode(hyper('Operation'))],
        [RDF.namedNode(uri), RDF.namedNode(hyper('method')), RDF.literal(definition.method)],
        getReturnedTypeStatement(uri, definition),
        getExpectedBodyStatement(uri, definition),
        getExpectedQueryParamsStatement(uri, definition),
        ...getConstraintStatements(uri, definition)
    )
];

function getReturnedTypeStatement(uri: string, { returnedType }: Operation): Statement | null {
    if (isUndefined(returnedType)) {
        return null;
    }

    return [RDF.namedNode(uri), RDF.namedNode(hyper('returnedType')), RDF.namedNode(returnedType)];
}

function getExpectedBodyStatement(uri: string, { expectedBody }: Operation): Statement | null {
    if (isUndefined(expectedBody)) {
        return null;
    }

    return [RDF.namedNode(uri), RDF.namedNode(hyper('expectedBody')), RDF.namedNode(expectedBody)];
}

function getExpectedQueryParamsStatement(uri: string, { expectedQueryParams }: Operation): Statement | null {
    if (isUndefined(expectedQueryParams)) {
        return null;
    }

    return [RDF.namedNode(uri), RDF.namedNode(hyper('expectedQueryParams')), RDF.namedNode(expectedQueryParams)];
}

function getConstraintStatements(uri: string, { constraints }: Operation): Statement[] {
    if (isEmpty(constraints)) {
        return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return constraints!.map(
        constraint => [RDF.namedNode(uri), RDF.namedNode(hyper('constraint')), RDF.namedNode(constraint)]
    );
}
