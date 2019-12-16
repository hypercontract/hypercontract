import { getJsonLdContextUri, ProfileStore } from '@hypercontract/profile';
import { NextFunction, Request, Response } from 'express';
import { defaultTo, isEmpty, isUndefined } from 'lodash';
import { handleNotAcceptable } from './error';

export function negotiateProfile(
    request: Request,
    response: Response,
    next: NextFunction,
    profileStore: ProfileStore,
    supportedMediaTypes: string[]
) {
    response.setHeader('Content-Profile', `<${profileStore.profileUri}>`)
    response.setHeader('Link', [
        `<${profileStore.profileUri}>; rel="profile"`,
        `<${getJsonLdContextUri(profileStore)}>; rel="http://www.w3.org/ns/json-ld#context"`
    ]);

    const acceptableProfiles = getAcceptableProfiles(request);

    if (isEmpty(acceptableProfiles) || acceptableProfiles.includes(profileStore.profileUri)) {
        return next();
    }

    return handleNotAcceptable(response, supportedMediaTypes, [profileStore.profileUri]);
}

function getAcceptableProfiles(request: Request) {
    const acceptProfileHeader = request.get('Accept-Profile');

    if (isUndefined(acceptProfileHeader)) {
        return [];
    }

    return parseAcceptableProfiles(acceptProfileHeader);
}

function parseAcceptableProfiles(acceptableProfiles: string): string[] {
    return defaultTo(
        acceptableProfiles.match(/<(.*?)>/g),
        [] as string[]
    )
        .map(profileUri => profileUri.replace(/^<(.*?)>$/, '$1'));
}
