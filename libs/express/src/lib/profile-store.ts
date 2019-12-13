import { JsonLdContext, Prefixes, Profile, rdf } from '@hypercontract/profile';
import { defaultTo, isEmpty, memoize } from 'lodash';
import { N3Store, Store } from 'n3';

export class ProfileStore {

    public readonly profileUri: string;
    public readonly defaultNamespace: string;
    public readonly prefixes: Prefixes;
    public readonly jsonLdContext: JsonLdContext;

    private store: N3Store;

    constructor({ defaultNamespace, graph, prefixes, jsonLdContext, uri }: Profile) {
        this.profileUri = uri;
        this.defaultNamespace = defaultNamespace;
        this.prefixes = prefixes;
        this.jsonLdContext = defaultTo(jsonLdContext, {});

        this.store = new Store(graph);
    }

    getAll() {
        return this.store.getQuads(null, null, null, null);
    }

    getAllAbout(uri: string) {
        return [
            ...this.store.getQuads(uri, null, null, null),
            ...this.store.getQuads(null, uri, null, null),
            ...this.store.getQuads(null, null, uri, null)
        ];
    }

    getAllByType(typeUri: string) {
        return this.getSubjects(rdf('type'), typeUri);
    }

    getSubject(predicate: string, object: string) {
        const subjects = this.getSubjects(predicate, object);
        return isEmpty(subjects) ? null : subjects[0];
    }

    getSubjects(predicate: string, object: string) {
        return this.store.getQuads(null, predicate, object, null)
            .map(quad => quad.subject.value);
    }

    getObject(subject: string, predicate: string) {
        const objects = this.getObjects(subject, predicate);
        return isEmpty(objects) ? null : objects[0];
    }

    getObjects(subject: string, predicate: string) {
        return this.store.getQuads(subject, predicate, null, null)
            .map(quad => quad.object.value);
    }
}

export const getProfileStore = memoize((profile: Profile) => new ProfileStore(profile));
