import { getJsonLdContext, getProfileStore } from '@hypercontract/profile';
import { Response } from 'express';
import { compact } from 'jsonld';
import { omit } from 'lodash';
import { profile } from '../../profile';
import { MediaType } from '../media-type';

export async function handleJsonLdResponse(response: Response, responseBody: any) {
    const profileStore = getProfileStore(profile);
    const body = await compact(responseBody, getJsonLdContext(profileStore));

    return response
        .type(MediaType.JsonLd)
        .send(omit(body, ['@context']));
}
