import { quad } from '@rdfjs/data-model';
import { isNull } from 'lodash';
import { Statement } from '../profile';

export const toQuads = (...statements: (Statement | null)[]) => statements
    .filter(statement => !isNull(statement))
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map(statement => statement!)
    .map(([subject, predicate, object]) => quad(subject, predicate, object))
