import { Profile } from '@hypercontract/profile';
import { Request, RequestHandler } from 'express';
import { handleNotFound } from './error';
import { getProfileStore } from './profile-store';
import { handleConceptRequest, handleProfileRequest, isConceptRequest, isProfileRequest } from './profile/profile';
import { handleSchemaRequest, isSchemaRequest } from './schema';

export function hypercontract(profile: Profile): RequestHandler {
    return (request, response) => {
        const requestUri = getRequestUri(request, profile);
        const profileStore = getProfileStore(profile);

        if (isSchemaRequest(requestUri, profileStore)) {
            return handleSchemaRequest(requestUri, response, profileStore);
        }

        if (isProfileRequest(requestUri, profileStore)) {
            return handleProfileRequest(requestUri, response, profileStore);
        }

        if (isConceptRequest(requestUri, profileStore)) {
            return handleConceptRequest(requestUri, response, profileStore);
        }

        return handleNotFound(response);
    }
}

function getRequestUri(request: Request, profile: Profile) {
    const documentUri = new URL(profile.uri);
    documentUri.pathname = request.originalUrl;
    return documentUri.toString();
}
