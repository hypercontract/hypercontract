import { Request } from 'express';
import { ProfileStore } from './profile-store';

export function getRequestUri(request: Request, profileStore: ProfileStore) {
    const documentUri = new URL(profileStore.profileUri);
    documentUri.pathname = request.originalUrl;
    return documentUri.toString();
}
