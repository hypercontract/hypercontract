import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { orderMockId, productMockId } from '../test';
import { getSchemaMatcher } from '../test/schema-matcher';
import { AppModule } from './app.module';
import { MediaType } from './formats/media-type';

describe('hypershop', () => {
    let app: INestApplication;

    beforeAll(async () => {

        const module = await Test.createTestingModule({
            imports: [AppModule]
        })
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    [
        MediaType.Json,
        // MediaType.JsonHal,
        MediaType.JsonLd
    ].forEach(mediaType => {

        describe(mediaType, () => {
            const toMatchSchemaOf = getSchemaMatcher(mediaType);

            it(`GET /`, () => {
                return request(app.getHttpServer())
                    .get(`/`)
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('ApiRoot', response)
                    });
            });

            it(`GET /products`, () => {
                return request(app.getHttpServer())
                    .get(`/products`)
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('SearchResults', response)
                    });
            });

            it(`GET /products/${productMockId}`, () => {
                return request(app.getHttpServer())
                    .get(`/products/${productMockId}`)
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('Product', response)
                    });
            });

            it(`GET /products?queryString=pizza`, () => {
                return request(app.getHttpServer())
                    .get(`/products`)
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('SearchResults', response)
                    });
            });

            it(`GET /shoppingCart`, () => {
                return request(app.getHttpServer())
                    .get(`/shoppingCart`)
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('ShoppingCart', response)
                    });
            });

            it(`GET /orders`, () => {
                return request(app.getHttpServer())
                    .get(`/orders`)
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('OrderHistory', response)
                    });
            });

            it(`GET /orders/${orderMockId}`, () => {
                return request(app.getHttpServer())
                    .get(`/orders/${orderMockId}`)
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('Order', response)
                    });
            });

            it(`GET /userProfile`, () => {
                return request(app.getHttpServer())
                    .get(`/userProfile`)
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('UserProfile', response)
                    });
            });

        });

    });

    afterAll(async () => {
        await app.close();
    });
});
