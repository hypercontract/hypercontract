import { environment } from '../environments/environment';

export const prefixes = {
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    owl: 'http://www.w3.org/2002/07/owl#',
    xsd: 'http://www.w3.org/2001/XMLSchema#',
    hyper: 'https://hypercontract.org/',
    shop: `${environment.baseUri}profile/`,
};

type NamespaceFn = (name: string) => string;

function createNamespaceFn(namespace: string): NamespaceFn {
    return (name: string) => namespace + name;
}

export const rdf: NamespaceFn = createNamespaceFn(prefixes.rdf);
export const rdfs: NamespaceFn = createNamespaceFn(prefixes.rdfs);
export const owl: NamespaceFn = createNamespaceFn(prefixes.owl);
export const xsd: NamespaceFn = createNamespaceFn(prefixes.xsd);
export const hyper: NamespaceFn = createNamespaceFn(prefixes.hyper);
export const shop: NamespaceFn = createNamespaceFn(prefixes.shop);
