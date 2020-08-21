import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { sendResponse } from '../../formats/handler';
import { MediaType } from '../../formats/media-type';
import { getAddressBasePath, getAddressPath, getAddressRootPath, getAddressRootUri } from '../../routing';
import { EntityId } from '../../store';
import { toJsonAddress, toJsonAddresses } from './address.json';
import { toJsonHalAddress, toJsonHalAddresses } from './address.json-hal';
import { toJsonLdAddress, toJsonLdAddresses } from './address.json-ld';
import { AddressUpdate, NewAddress } from './address.model';
import { AddressService } from './address.service';

@Controller(getAddressBasePath())
export class AddressController {

    constructor(
        private addressService: AddressService
    ) { }

    @Get(getAddressRootPath())
    async getAddresses(
        @Res() response: Response
    ) {
        const addresses = await this.addressService.getAllAddresses();

        return sendResponse(response, {
            json: toJsonAddresses(addresses),
            [MediaType.JsonHal]: toJsonHalAddresses(addresses),
            [MediaType.JsonLd]: toJsonLdAddresses(addresses)
        })
    }

    @Post(getAddressRootPath())
    async addAddress(
        @Req() request: Request,
        @Res() response: Response,
        @Body() newAddress: NewAddress
    ) {
        await this.addressService.addAddress(newAddress);

        const statusCode = request.accepts('html') ? 303 : 201;
        return response.redirect(statusCode, getAddressRootUri());
    }

    @Get(getAddressPath())
    async getAddress(
        @Res() response: Response,
        @Param('addressId') addressId: EntityId
    ) {
        const address = await this.addressService.getAddress(addressId);

        return sendResponse(response, {
            json: toJsonAddress(address),
            [MediaType.JsonHal]: toJsonHalAddress(address),
            [MediaType.JsonLd]: toJsonLdAddress(address)
        });
    }

    @Put(getAddressPath())
    async updateAddress(
        @Res() response: Response,
        @Param('addressId') addressId: EntityId,
        @Body() addressUpdate: AddressUpdate
    ) {
        await this.addressService.updateAddress(addressId, addressUpdate);

        return response.redirect(303, getAddressRootUri());
    }

    @Delete(getAddressPath())
    async removeAddress(
        @Res() response: Response,
        @Param('addressId') addressId: EntityId
    ) {
        await this.addressService.removeAddress(addressId);

        return response.redirect(303, getAddressRootUri());
    }
}
