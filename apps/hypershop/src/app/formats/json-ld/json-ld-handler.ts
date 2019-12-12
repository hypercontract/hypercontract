import { Response } from 'express';
import { compact } from 'jsonld';
import { shop } from '../../profile/namespaces';
import { MediaType } from '../media-type';

export async function handleJsonLdResponse(response: Response, responseBody: any) {
    const body = await compact(responseBody, {
        '@vocab': shop('')
    });

    return response
        .type(MediaType.JsonLd)
        .send(body);
}
