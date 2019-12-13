import { Schema } from '@hypercontract/profile';
import { getCatalogSearchUriTemplate } from '../../routing';
import { shop } from '../namespaces';

export const uriTemplateSchemas: Schema[] = [
    {
        conceptUri: shop('SearchQuery'),
        targetType: 'text/uri-list',
        schemaType: 'application/td+xml',
        schemaDefinition: `
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="td-00.xslt"?>
<td xmlns="urn:ietf:rfc:9999"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="urn:ietf:rfc:9999 td-00.xsd"
    hreft="${getCatalogSearchUriTemplate()}">
    <variable name="queryString" concept-uri="${shop('queryString')}">
        <restriction base="string"/>
        <documentation xml:lang="en">A free-text search term that is used to search the catalog for Products. It is matched against the product name and the product description.</documentation>
    </variable>
    <documentation xml:lang="en">Search criteria used to search the catalog for Products.</documentation>
</td>`.trim()
    }
];
