import { asyncHandler } from '@hypercontract/express';
import { Router } from 'express';
import { sendResponse } from '../../formats/handler';
import { MediaType } from '../../formats/media-type';
import { getPaymentOptionPath, getPaymentOptionRootPath, getPaymentOptionRootUri } from '../../routing';
import { toJsonPaymentOption, toJsonPaymentOptions } from './payment-option.json';
import { toJsonHalPaymentOption, toJsonHalPaymentOptions } from './payment-option.json-hal';
import { toJsonLdPaymentOption, toJsonLdPaymentOptions } from './payment-option.json-ld';
import { NewPaymentOption, PaymentOptionUpdate } from './payment-option.model';
import { PaymentOptionService } from './payment-option.service';

export function createPaymentOptionRouter(paymentOptionService: PaymentOptionService): Router {
    const router = Router();


    router.get(getPaymentOptionRootPath(), asyncHandler(async (_request, response) => {
        const paymentOptiones = await paymentOptionService.getAllPaymentOptions();

        return sendResponse(response, {
            json: toJsonPaymentOptions(paymentOptiones),
            [MediaType.JsonHal]: toJsonHalPaymentOptions(paymentOptiones),
            [MediaType.JsonLd]: toJsonLdPaymentOptions(paymentOptiones)
        });
    }));

    router.post(getPaymentOptionRootPath(), asyncHandler(async (request, response) => {
        const newPaymentOption = request.body as NewPaymentOption;

        await paymentOptionService.addPaymentOption(newPaymentOption);

        const statusCode = request.accepts('html') ? 303 : 201;
        return response.redirect(statusCode, getPaymentOptionRootUri());
    }));

    router.get(getPaymentOptionPath(), asyncHandler(async (request, response) => {
        const paymentOptionId = request.params.paymentOptionId;

        const paymentOption = await paymentOptionService.getPaymentOption(paymentOptionId);

        return sendResponse(response, {
            json: toJsonPaymentOption(paymentOption),
            [MediaType.JsonHal]: toJsonHalPaymentOption(paymentOption),
            [MediaType.JsonLd]: toJsonLdPaymentOption(paymentOption)
        });
    }));

    router.put(getPaymentOptionPath(), asyncHandler(async (request, response) => {
        const paymentOptionId = request.params.paymentOptionId;
        const paymentOptionUpdate = request.body as PaymentOptionUpdate;

        await paymentOptionService.updatePaymentOption(paymentOptionId, paymentOptionUpdate);

        return response.redirect(303, getPaymentOptionRootUri());
    }));

    router.delete(getPaymentOptionPath(), asyncHandler(async (request, response) => {
        const paymentOptionId = request.params.paymentOptionId;

        await paymentOptionService.removePaymentOption(paymentOptionId);

        return response.redirect(303, getPaymentOptionRootUri());
    }));

    return router;
}
