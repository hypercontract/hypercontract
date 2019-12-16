import { ProfileStore } from '@hypercontract/profile';
import { Request } from 'express';

export function getRequestUri(request: Request, profileStore: ProfileStore) {
    const documentUri = new URL(profileStore.profileUri);
    documentUri.pathname = request.originalUrl;
    return documentUri.toString();
}
