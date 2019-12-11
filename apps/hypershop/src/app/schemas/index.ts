import { Schemas } from '@hypercontract/profile';
import { jsonSchemas } from './json';
import { jsonLdSchemas } from './json-ld';

export const schemas = new Schemas([
    ...jsonSchemas,
    ...jsonLdSchemas
]);
