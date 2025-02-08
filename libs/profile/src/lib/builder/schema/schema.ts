import RDF from '@rdfjs/data-model';
import { isUndefined, values } from 'lodash';
import { hyper, rdf } from '../../namespaces';
import { toQuads } from '../quad';

interface SchemaMap {
    [conceptUri: string]: {
        [targetType: string]: Schema;
    };
}

export class Schemas {
    private schemas: Schema[] = [];
    private conceptSchemas: SchemaMap = {};

    constructor(schemas: Schema[]) {
        schemas.forEach(schema => this.add(schema));
    }

    get(conceptUri: string): Schema[] {
        return values(this.conceptSchemas[conceptUri]);
    }

    getAll() {
        return [...this.schemas];
    }

    private add(schema: Schema) {
        if (isUndefined(this.conceptSchemas[schema.conceptUri])) {
            this.conceptSchemas[schema.conceptUri] = {};
        }

        if (!isUndefined(this.conceptSchemas[schema.conceptUri][schema.targetType])) {
            throw new Error(`A schema of type ${schema.targetType} has already been defined for ${schema.conceptUri}`);
        }

        this.schemas = [...this.schemas, schema];
        this.conceptSchemas[schema.conceptUri][schema.targetType] = schema;
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
        [RDF.namedNode(uri), RDF.namedNode(schemaRelation), RDF.namedNode(schemaUri)],
        [RDF.namedNode(schemaUri), RDF.namedNode(rdf('type')), RDF.namedNode(hyper('Schema'))],
        [RDF.namedNode(schemaUri), RDF.namedNode(hyper('targetType')), RDF.literal(definition.targetType)],
        [RDF.namedNode(schemaUri), RDF.namedNode(hyper('schemaType')), RDF.literal(definition.schemaType)],
        [RDF.namedNode(schemaUri), RDF.namedNode(rdf('value')), RDF.literal(definition.schemaDefinition)],
    );
};

function getSchemaUri(conceptUri: string, { targetType }: Schema) {
    return `${conceptUri}/schema/${targetType}`;
}
