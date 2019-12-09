export const context = {
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    owl: 'http://www.w3.org/2002/07/owl#',
    xsd: 'http://www.w3.org/2001/XMLSchema#',
    hyper: 'https://hypercontract.org/',
    shop: 'https://example.hypercontract.org/profile/',
};

type NamespaceFn = (name: string) => string;

function createNamespaceFn(namespace: string): NamespaceFn {
    return (name: string) => namespace + name;
}

export const rdf: NamespaceFn = createNamespaceFn(context.rdf);
export const rdfs: NamespaceFn = createNamespaceFn(context.rdfs);
export const owl: NamespaceFn = createNamespaceFn(context.owl);
export const xsd: NamespaceFn = createNamespaceFn(context.xsd);
export const hyper: NamespaceFn = createNamespaceFn(context.hyper);
export const shop: NamespaceFn = createNamespaceFn(context.shop);
