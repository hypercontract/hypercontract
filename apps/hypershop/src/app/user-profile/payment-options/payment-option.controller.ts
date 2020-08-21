import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { sendResponse } from '../../formats/handler';
import { MediaType } from '../../formats/media-type';
import { getPaymentOptionBasePath, getPaymentOptionPath, getPaymentOptionRootPath, getPaymentOptionRootUri } from '../../routing';
import { EntityId } from '../../store';
import { toJsonPaymentOption, toJsonPaymentOptions } from './payment-option.json';
import { toJsonHalPaymentOption, toJsonHalPaymentOptions } from './payment-option.json-hal';
import { toJsonLdPaymentOption, toJsonLdPaymentOptions } from './payment-option.json-ld';
import { NewPaymentOption, PaymentOptionUpdate } from './payment-option.model';
import { PaymentOptionService } from './payment-option.service';

@Controller(getPaymentOptionBasePath())
export class PaymentOptionController {

    constructor(
        private paymentOptionService: PaymentOptionService
    ) { }


    @Get(getPaymentOptionRootPath())
    async getPaymentOptions(
        @Res() response: Response
    ) {
        const paymentOptiones = await this.paymentOptionService.getAllPaymentOptions();

        return sendResponse(response, {
            json: toJsonPaymentOptions(paymentOptiones),
            [MediaType.JsonHal]: toJsonHalPaymentOptions(paymentOptiones),
            [MediaType.JsonLd]: toJsonLdPaymentOptions(paymentOptiones)
        })
    }

    @Post(getPaymentOptionRootPath())
    async addPaymentOption(
        @Req() request: Request,
        @Res() response: Response,
        @Body() newPaymentOption: NewPaymentOption
    ) {
        await this.paymentOptionService.addPaymentOption(newPaymentOption);

        const statusCode = request.accepts('html') ? 303 : 201;
        return response.redirect(statusCode, getPaymentOptionRootUri());
    }

    @Get(getPaymentOptionPath())
    async getPaymentOption(
        @Res() response: Response,
        @Param('paymentOptionId') paymentOptionId: EntityId
    ) {
        const paymentOption = await this.paymentOptionService.getPaymentOption(paymentOptionId);

        return sendResponse(response, {
            json: toJsonPaymentOption(paymentOption),
            [MediaType.JsonHal]: toJsonHalPaymentOption(paymentOption),
            [MediaType.JsonLd]: toJsonLdPaymentOption(paymentOption)
        });
    }

    @Put(getPaymentOptionPath())
    async updatePaymentOption(
        @Res() response: Response,
        @Param('paymentOptionId') paymentOptionId: EntityId,
        @Body() paymentOptionUpdate: PaymentOptionUpdate
    ) {
        await this.paymentOptionService.updatePaymentOption(paymentOptionId, paymentOptionUpdate);

        return response.redirect(303, getPaymentOptionRootUri());
    }

    @Delete(getPaymentOptionPath())
    async removePaymentOption(
        @Res() response: Response,
        @Param('paymentOptionId') paymentOptionId: EntityId
    ) {
        await this.paymentOptionService.removePaymentOption(paymentOptionId);

        return response.redirect(303, getPaymentOptionRootUri());
    }
}
