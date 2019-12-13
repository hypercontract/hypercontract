import { renderFile } from 'ejs';
import { Response } from 'express';
import { join } from 'path';
import { ProfileStore } from '../../profile-store';
import { getDefinitions } from './definitions';

export const toHtml = async (
    response: Response,
    profileStore: ProfileStore
) => {

    console.error('REPLACE PATH');
    console.error('REPLACE PATH');
    console.error('REPLACE PATH');
    console.error('REPLACE PATH');
    console.error('REPLACE PATH');
    console.error('REPLACE PATH');
    console.error('REPLACE PATH');

    const {
        title,
        entryPoints,
        description,
        representationClasses,
        representationProperties,
        stateTransitions,
        operations
    } = await getDefinitions(profileStore);

    const document: string = await renderFile(join(__dirname, '../../../libs/express/src/lib/profile/html/profile.ejs'), {
        namespace: profileStore.defaultNamespace,
        title,
        description,
        entryPoints,
        representationClasses,
        representationProperties,
        stateTransitions,
        operations
    });

    return response.send(document);
}
