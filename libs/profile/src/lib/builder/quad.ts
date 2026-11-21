import RDF from '@rdfjs/data-model';
import type { Quad } from '@rdfjs/types';
import { isNull } from 'lodash';
import { Statement } from '../profile';

export const toQuads = (...statements: (Statement | null)[]): Quad[] => statements
    .filter(statement => !isNull(statement))
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map(statement => statement!)
    .map(([subject, predicate, object]) => RDF.quad(subject, predicate, object));
