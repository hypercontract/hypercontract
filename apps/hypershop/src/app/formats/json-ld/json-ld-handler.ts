import { Response } from 'express';
import { compact } from 'jsonld';
import { defaultTo, omit } from 'lodash';
import { shop } from '../../profile/namespaces';
import { MediaType } from '../media-type';

export async function handleJsonLdResponse(response: Response, responseBody: any) {
    const context = defaultTo(responseBody['@context'], {});

    const body = await compact(omit(responseBody, ['@context']), {
        '@vocab': shop(''),
        ...context
    });

    return response
        .type(MediaType.JsonLd)
        .send(body);
}
