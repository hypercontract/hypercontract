import { merge, without, zipObject } from 'lodash';
import { hyper, owl, rdf } from './namespaces';
import { JsonLdContext } from './profile';
import { ProfileStore } from './profile-store';

export const jsonLdContext: JsonLdContext = {
    'rdfs:domain': { '@type': '@id' },
    'rdfs:range': { '@type': '@id' }
};

export const jsonLdHyperContext: JsonLdContext = {
    ...jsonLdContext,
    'hyper:valueSchema': { '@type': '@id' },
    'hyper:instanceSchema': { '@type': '@id' },
    'hyper:expectedBody': { '@type': '@id' },
    'hyper:expectedQueryParams': { '@type': '@id' },
    'hyper:returnedType': { '@type': '@id' },
    'hyper:constraint': { '@type': '@id' },
};

export function getJsonLdContext(profileStore: ProfileStore) {
    return merge(
        { '@vocab': profileStore.defaultNamespace },
        getStateTransitions(profileStore),
        getNonFunctionalProperties(profileStore)
    );
}

export function getJsonLdContextUri(profileStore: ProfileStore) {
    return `${profileStore.profileUri}/context.jsonld`;
}

function getStateTransitions(profileStore: ProfileStore) {
    const stateTransitions = profileStore.getAllByType(hyper('StateTransition'));

    return zipObject(
        stateTransitions.map(uri => localName(uri, profileStore)),
        stateTransitions.map(() => ({
            '@type': '@id'
        }))
    );
}

function getNonFunctionalProperties(profileStore: ProfileStore) {
    const functionalProperties = profileStore.getAllByType(owl('FunctionalProperty'));
    const properties = [
        ...profileStore.getAllByType(owl('ObjectProperty')),
        ...profileStore.getAllByType(owl('DatatypeProperty')),
        ...profileStore.getAllByType(rdf('Property'))
    ];

    const nonFunctionalProperties = without(properties, ...functionalProperties);

    return zipObject(
        nonFunctionalProperties.map(uri => localName(uri, profileStore)),
        nonFunctionalProperties.map(() => ({
            '@container': '@set'
        }))
    );
}

function localName(uri: string, profileStore: ProfileStore) {
    return uri.replace(profileStore.defaultNamespace, '');
}
