import { render } from 'ejs';
import { Response } from 'express';
import { ProfileStore } from '../../profile-store';
import { getDefinitions } from './definitions';
import { template } from './profile-template';

export const toHtml = async (
    response: Response,
    profileStore: ProfileStore
) => {
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

function toHtmlId(name: string) {
    return name
        .replace(/[/+]/g, '-');
}
