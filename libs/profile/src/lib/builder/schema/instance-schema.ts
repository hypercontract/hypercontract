import { hyper } from '../../namespaces';
import { schema, Schema } from './schema';

export interface InstanceSchema extends Schema {}

export const instanceSchema = (uri: string, definition: InstanceSchema) => schema(
    uri,
    hyper('instanceSchema'),
    definition
);
