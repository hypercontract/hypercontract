import { RdfDocument } from '@hypercontract/profile';
import { RequestHandler } from 'express';
import { negotiateProfile } from './content-negotiation';
import { getProfileStore } from './profile-store';
import { handleConceptRequest, handleProfileRequest, isConceptRequest, isProfileRequest } from './profile/profile';
import { handleSchemaRequest, isSchemaRequest } from './schema';

export function hypercontract(profile: RdfDocument, supportedMediaTypes: string[]): RequestHandler {
    return (request, response, next) => {
        const profileStore = getProfileStore(profile);

        if (isSchemaRequest(request, profileStore)) {
            return handleSchemaRequest(request, response, profileStore);
        }

        if (isProfileRequest(request, profileStore)) {
            return handleProfileRequest(request, response, profileStore);
        }

        if (isConceptRequest(request, profileStore)) {
            return handleConceptRequest(request, response, profileStore);
        }

        return negotiateProfile(request, response, next, profileStore, supportedMediaTypes);
    }
}
