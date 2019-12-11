import { literal, namedNode } from '@rdfjs/data-model';
import { isUndefined, values } from 'lodash';
import { hyper, rdf } from '../../namespaces';
import { toQuads } from '../quad';

interface SchemaMap {
    [conceptUri: string]: {
        [schemaType: string]: Schema;
    };
}

export class Schemas {
    private schemas: SchemaMap = {};

    constructor(schemas: Schema[]) {
        schemas.forEach(schema => this.add(schema));
    }

    get(conceptUri: string): Schema[] {
        return values(this.schemas[conceptUri]);
    }

    private add(schema: Schema) {
        if (isUndefined(this.schemas[schema.conceptUri])) {
            this.schemas[schema.conceptUri] = {};
        }

        if (!isUndefined(this.schemas[schema.conceptUri][schema.targetType])) {
            throw new Error(`A schema of type ${schema.targetType} has already been defined for ${schema.conceptUri}`);
        }

        this.schemas[schema.conceptUri][schema.targetType] = schema;
    }
}

export interface Schema {
    conceptUri: string;
    schemaType: string;
    targetType: string;
    schemaDefinition: string;
}

export const schema = (uri: string, schemaRelation: string, definition: Schema) => {
    const schemaUri = getSchemaUri(uri, definition);
    return toQuads(
        [namedNode(uri), namedNode(schemaRelation), namedNode(schemaUri)],
        [namedNode(schemaUri), namedNode(rdf('type')), namedNode(hyper('Schema'))],
        [namedNode(schemaUri), namedNode(hyper('targetType')), literal(definition.targetType)],
        [namedNode(schemaUri), namedNode(hyper('schemaType')), literal(definition.schemaType)],
        [namedNode(schemaUri), namedNode(rdf('value')), literal(definition.schemaDefinition)],
    );
};

function getSchemaUri(conceptUri: string, { targetType }: Schema) {
    return `${conceptUri}/schema/${targetType}`;
}
