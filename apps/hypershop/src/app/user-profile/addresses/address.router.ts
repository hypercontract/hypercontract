import { asyncHandler } from '@hypercontract/express';
import { Router } from 'express';
import { sendResponse } from '../../formats/handler';
import { MediaType } from '../../formats/media-type';
import { getAddressPath, getAddressRootPath, getAddressRootUri } from '../../routing';
import { toJsonAddress, toJsonAddresses } from './address.json';
import { toJsonHalAddress, toJsonHalAddresses } from './address.json-hal';
import { toJsonLdAddress, toJsonLdAddresses } from './address.json-ld';
import { AddressUpdate, NewAddress } from './address.model';
import { AddressService } from './address.service';

export function createAddressRouter(addressService: AddressService): Router {
    const router = Router();

    router.get(getAddressRootPath(), asyncHandler(async (_request, response) => {
        const addresses = await addressService.getAllAddresses();

        return sendResponse(response, {
            json: toJsonAddresses(addresses),
            [MediaType.JsonHal]: toJsonHalAddresses(addresses),
            [MediaType.JsonLd]: toJsonLdAddresses(addresses)
        });
    }));

    router.post(getAddressRootPath(), asyncHandler(async (request, response) => {
        const newAddress = request.body as NewAddress;

        await addressService.addAddress(newAddress);

        const statusCode = request.accepts('html') ? 303 : 201;
        return response.redirect(statusCode, getAddressRootUri());
    }));

    router.get(getAddressPath(), asyncHandler(async (request, response) => {
        const addressId = request.params.addressId;

        const address = await addressService.getAddress(addressId);

        return sendResponse(response, {
            json: toJsonAddress(address),
            [MediaType.JsonHal]: toJsonHalAddress(address),
            [MediaType.JsonLd]: toJsonLdAddress(address)
        });
    }));

    router.put(getAddressPath(), asyncHandler(async (request, response) => {
        const addressId = request.params.addressId;
        const addressUpdate = request.body as AddressUpdate;

        await addressService.updateAddress(addressId, addressUpdate);

        return response.redirect(303, getAddressRootUri());
    }));

    router.delete(getAddressPath(), asyncHandler(async (request, response) => {
        const addressId = request.params.addressId;

        await addressService.removeAddress(addressId);

        return response.redirect(303, getAddressRootUri());
    }));

    return router;
}
