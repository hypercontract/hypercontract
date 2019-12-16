import { ProfileStore, RdfDocument } from '@hypercontract/profile';
import { HttpStatus } from '@nestjs/common';
import { render } from 'ejs';
import { Response } from 'express';
import { getDefinitions } from './definitions';
import { template } from './profile-template';

export const toHtml = async (
    response: Response,
    rdfDocument: RdfDocument,
    profileStore: ProfileStore
) => {
    if (isConceptRequest(rdfDocument, profileStore)) {
        return redirectToConcept(rdfDocument, profileStore, response);
    }

    const {
        title,
        entryPoints,
        description,
        representationClasses,
        representationProperties,
        stateTransitions,
        operations
    } = await getDefinitions(profileStore);

    const document: string = await render(template, {
        namespace: profileStore.defaultNamespace,
        title,
        description,
        entryPoints,
        representationClasses,
        representationProperties,
        stateTransitions,
        operations,
        toHtmlId
    });

    return response.send(document);
}

function redirectToConcept(rdfDocument: RdfDocument, profileStore: ProfileStore, response: Response) {
    const redirectUrl = rdfDocument.uri.replace(profileStore.defaultNamespace, `${profileStore.profileUri}#`);
    return response.redirect(HttpStatus.SEE_OTHER, redirectUrl);
}

function isConceptRequest(rdfDocument: RdfDocument, profileStore: ProfileStore) {
    return rdfDocument.uri !== profileStore.profileUri;
}

function toHtmlId(name: string) {
    return name
        .replace(/[/+]/g, '-');
}
