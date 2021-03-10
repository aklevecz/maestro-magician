import { UserRoles } from "./maestro-user";

export interface CustomWindow extends Window {
    analytics: any;
    m: any;
    userDisplayName: string;
    userAccountId: string;
    userDisplayNameSavedTime: number;
    userEmail: string;
    modifiedAt: number;
    roles: UserRoles[];
    siteId: string;
    subscriptions: string[];
    uid: string;
    created: number;
    modified: number;
    tags: string[];
    service: string;
    iat: number;
    exp: number;
}
