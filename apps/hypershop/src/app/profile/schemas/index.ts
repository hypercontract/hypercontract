import { Schemas } from '@hypercontract/profile';
import { jsonSchemas } from './json';
import { jsonCommonSchemas } from './json-common';
import { jsonHalSchemas } from './json-hal';
import { jsonLdSchemas } from './json-ld';
import { uriTemplateSchemas } from './uri-template';

export const schemas = new Schemas([
    ...jsonCommonSchemas,
    ...jsonSchemas,
    ...jsonHalSchemas,
    ...jsonLdSchemas,
    ...uriTemplateSchemas
]);
