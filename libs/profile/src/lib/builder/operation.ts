import { literal, namedNode } from '@rdfjs/data-model';
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
        [namedNode(uri), namedNode(rdf('type')), namedNode(hyper('Operation'))],
        [namedNode(uri), namedNode(hyper('method')), literal(definition.method)],
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

    return [namedNode(uri), namedNode(hyper('returnedType')), namedNode(returnedType)];
}

function getExpectedBodyStatement(uri: string, { expectedBody }: Operation): Statement | null {
    if (isUndefined(expectedBody)) {
        return null;
    }

    return [namedNode(uri), namedNode(hyper('expectedBody')), namedNode(expectedBody)];
}

function getExpectedQueryParamsStatement(uri: string, { expectedQueryParams }: Operation): Statement | null {
    if (isUndefined(expectedQueryParams)) {
        return null;
    }

    return [namedNode(uri), namedNode(hyper('expectedQueryParams')), namedNode(expectedQueryParams)];
}

function getConstraintStatements(uri: string, { constraints }: Operation): Statement[] {
    if (isEmpty(constraints)) {
        return [];
    }

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    return constraints!.map(
        constraint => [namedNode(uri), namedNode(hyper('constraint')), namedNode(constraint)]
    );
}
