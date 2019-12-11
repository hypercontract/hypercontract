import { hyper } from '../../namespaces';
import { Schema, schema } from './schema';

export interface ValueSchema extends Schema {}

export const valueSchema = (uri: string, definition: ValueSchema) => schema(
    uri,
    hyper('valueSchema'),
    definition
);
