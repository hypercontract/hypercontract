import { namedNode } from '@rdfjs/data-model';
import { flatten, isEmpty } from 'lodash';
import { owl, rdf } from '../namespaces';
import { concept, Concept } from './concept';
import { toQuads } from './quad';
import { InstanceSchema, instanceSchema } from './schema';

export interface ResourceClass extends Concept {
    schemas?: InstanceSchema[];
}

export const resourceClass = (uri: string, definition: ResourceClass) => [
    ...concept(uri, definition),
    ...getInstanceSchemaStatements(uri, definition),
    ...toQuads(
        [namedNode(uri), namedNode(rdf('type')), namedNode(owl('Class'))],
    )
];

function getInstanceSchemaStatements(uri: string, { schemas }: ResourceClass) {
    if (isEmpty(schemas)) {
        return []
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return flatten(schemas!.map(
        schema => instanceSchema(uri, schema)
    ));
}
