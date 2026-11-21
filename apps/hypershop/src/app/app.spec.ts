import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';
import request from 'supertest';
import { orderMockId, productMockId } from '../test';
import { getSchemaMatcher } from '../test/schema-matcher';
import { createApp } from './app';
import { MediaType } from './formats/media-type';
import { profile } from './profile';
import { getProductUri, getShoppingCartRootUri } from './routing';

describe('hypershop', () => {
    let app: Awaited<ReturnType<typeof createApp>>;

    before(async () => {
        app = await createApp();
    });

    [
        MediaType.Json,
        MediaType.JsonHal,
        MediaType.JsonLd
    ].forEach(mediaType => {

        describe(mediaType, () => {
            const toMatchSchemaOf = getSchemaMatcher(mediaType);

            it(`GET /`, async () => {
                await request(app)
                    .get(`/`)
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('ApiRoot', response);
                    });
            });

            it(`GET /products`, async () => {
                await request(app)
                    .get(`/products`)
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('SearchResults', response);
                    });
            });

            it(`GET /products/${productMockId}`, async () => {
                await request(app)
                    .get(`/products/${productMockId}`)
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('Product', response);
                    });
            });

            it(`GET /products?queryString=pizza`, async () => {
                await request(app)
                    .get(`/products`)
                    .query({ queryString: 'pizza' })
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('SearchResults', response);
                    });
            });

            it(`GET /shoppingCart`, async () => {
                await request(app)
                    .get(`/shoppingCart`)
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('ShoppingCart', response);
                    });
            });

            it(`GET /orders`, async () => {
                await request(app)
                    .get(`/orders`)
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('OrderHistory', response);
                    });
            });

            it(`GET /orders/${orderMockId}`, async () => {
                await request(app)
                    .get(`/orders/${orderMockId}`)
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('Order', response);
                    });
            });

            it(`GET /userProfile`, async () => {
                await request(app)
                    .get(`/userProfile`)
                    .set('Accept', mediaType)
                    .expect(200)
                    .expect(response => {
                        toMatchSchemaOf('UserProfile', response);
                    });
            });

        });

    });

    it('renders the homepage and exposes profile and CORS headers', async () => {
        await request(app)
            .get('/')
            .set('Accept', MediaType.Html)
            .expect('Content-Type', /html/)
            .expect('Content-Profile', `<${profile.uri}>`)
            .expect('Access-Control-Allow-Origin', '*')
            .expect('Access-Control-Expose-Headers', 'Location')
            .expect(200, /hypershop/i);
    });

    it('serves product assets', async () => {
        await request(app)
            .get(`/assets/product-${productMockId}.jpg`)
            .expect('Content-Type', /image\/jpeg/)
            .expect(200);
    });

    it('redirects after adding an item and honors an HTML form method override', async () => {
        assert.ok(productMockId);

        await request(app)
            .post('/shoppingCart/items')
            .type(MediaType.JsonHal)
            .set('Accept', MediaType.JsonHal)
            .send({ product: getProductUri(productMockId), quantity: 1 })
            .expect('Location', getShoppingCartRootUri())
            .expect(201);

        const cart = await request(app).get('/shoppingCart').set('Accept', MediaType.Json).expect(200);
        assert.equal(cart.body.items.length, 1);

        await request(app)
            .post(new URL(cart.body.items[0]._id).pathname)
            .type('form')
            .send({ _method: 'DELETE' })
            .expect('Location', getShoppingCartRootUri())
            .expect(303);

        const emptyCart = await request(app).get('/shoppingCart').set('Accept', MediaType.Json).expect(200);
        assert.deepEqual(emptyCart.body.items, []);
    });

    it('returns JSON errors for malformed bodies and unknown routes', async () => {
        await request(app)
            .post('/shoppingCart/items')
            .type(MediaType.JsonLd)
            .send('{')
            .expect('Content-Type', /json/)
            .expect(400);

        await request(app)
            .get('/missing?example=1')
            .expect(404, { message: 'Cannot GET /missing?example=1', error: 'Not Found', statusCode: 404 });
    });

    it('returns a JSON 500 when an async route rejects', async (context) => {
        context.mock.method(console, 'error', () => undefined);

        await request(app)
            .get('/products/missing')
            .set('Accept', MediaType.Json)
            .expect(500, { statusCode: 500, message: 'Internal server error' });
    });
});
