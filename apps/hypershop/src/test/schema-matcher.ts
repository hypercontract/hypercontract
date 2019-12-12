import { toJsonSchemaId } from '@hypercontract/profile';
import * as Ajv from 'ajv';
import * as request from 'supertest';
import { shop } from '../app/profile/namespaces';
import { schemas } from '../app/profile/schemas';

const ajv = new Ajv({
    multipleOfPrecision: 2,
    schemas: schemas.getAll()
        .map(schema => JSON.parse(schema.schemaDefinition))
});

export function getSchemaMatcher(targetType: string) {
    return (concept: string, response: request.Response) => {
        const valid = ajv.validate(
            toJsonSchemaId(shop(concept), targetType),
            response.body
        );
        if (!valid) {
            throw new Error(`${ajv.errorsText()}\n\n${JSON.stringify(response.body, undefined, 4)}`);
        }
    };
}
