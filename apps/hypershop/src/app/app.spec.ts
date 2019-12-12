import { toJsonSchemaId } from '@hypercontract/profile';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as Ajv from 'ajv';
import * as request from 'supertest';
import { orderMocks, productMocks } from '../test';
import { AppModule } from './app.module';
import { MediaType } from './content-negotiation';
import { shop } from './profile/namespaces';
import { schemas } from './profile/schemas';

const ajv = new Ajv({
    multipleOfPrecision: 2,
    schemas: schemas.getAll()
        .filter(schema => schema.targetType === MediaType.Json)
        .map(schema => JSON.parse(schema.schemaDefinition))
});

const toMatchInstanceSchema = (concept: string, response: request.Response) => {
    const valid = ajv.validate(
        toJsonSchemaId(shop(concept), MediaType.Json),
        response.body
    );
    if (!valid) {
        throw new Error(`${ajv.errorsText()}\n\n${JSON.stringify(response.body, undefined, 4)}`);
    }
}

describe('hypershop', () => {
    let app: INestApplication;

    const productMockId = productMocks[0]._id;
    const orderMockId = orderMocks[0]._id;

    beforeAll(async () => {

        const module = await Test.createTestingModule({
            imports: [AppModule]
        })
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    it(`GET /`, () => {
        return request(app.getHttpServer())
            .get(`/`)
            .expect(200)
            // .expect(responseToMatch('ApiRoot'));
            .expect(response => {
                toMatchInstanceSchema('ApiRoot', response)
            });
    });

    it(`GET /products`, () => {
        return request(app.getHttpServer())
            .get(`/products`)
            .expect(200)
            // .expect(responseToMatch('SearchResults'));
            .expect(response => {
                toMatchInstanceSchema('SearchResults', response)
            });
    });

    it(`GET /products/${productMockId}`, () => {
        return request(app.getHttpServer())
            .get(`/products/${productMockId}`)
            .expect(200)
            // .expect(responseToMatch('Product'));
            .expect(response => {
                toMatchInstanceSchema('Product', response)
            });
    });

    it(`GET /products?queryString=pizza`, () => {
        return request(app.getHttpServer())
            .get(`/products`)
            .expect(200)
            // .expect(responseToMatch('SearchResults'));
            .expect(response => {
                toMatchInstanceSchema('SearchResults', response)
            });
    });

    it(`GET /shoppingCart`, () => {
        return request(app.getHttpServer())
            .get(`/shoppingCart`)
            .expect(200)
            // .expect(responseToMatch('ShoppingCart'));
            .expect(response => {
                toMatchInstanceSchema('ShoppingCart', response)
            });
    });

    it(`GET /orders`, () => {
        return request(app.getHttpServer())
            .get(`/orders`)
            .expect(200)
            // .expect(responseToMatch('OrderHistory'));
            .expect(response => {
                toMatchInstanceSchema('OrderHistory', response)
            });
    });

    it(`GET /orders/${orderMockId}`, () => {
        return request(app.getHttpServer())
            .get(`/orders/${orderMockId}`)
            .expect(200)
            // .expect(responseToMatch('Order'));
            .expect(response => {
                toMatchInstanceSchema('Order', response)
            });
    });

    it(`GET /userProfile`, () => {
        return request(app.getHttpServer())
            .get(`/userProfile`)
            .expect(200)
            // .expect(responseToMatch('UserProfile'));
            .expect(response => {
                toMatchInstanceSchema('UserProfile', response)
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
