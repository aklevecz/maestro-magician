import { CustomWindow } from "./custom.window";

const LOGIN_EVENT_NAME = "Account Logged In - Client";
const ACCOUNT_CREATED_EVENT_NAME = "Account Created - Client"

export const trackUserLogin = (
    email: string,
    username: string,
    _window: CustomWindow
) => {
    _window.analytics.track(LOGIN_EVENT_NAME, {
        email,
        username,
    });
};

export const trackUserCreateAccount = (
    email: string,
    username: string,
    emailOptin: boolean,
    _window: CustomWindow
) => {
    _window.analytics.track(ACCOUNT_CREATED_EVENT_NAME, {
        authProvider: "email", // Currently I don't see any other options?
        email,
        username,
        emailOptin,
    });
};

export const trackIdentify = (
    id: string,
    createdAt: number,
    email: string,
    emailOptin: boolean,
    modifiedAt: number,
    username: string,
    _window: CustomWindow
) => {
    _window.analytics.identify(id, {
        createdAt: new Date(createdAt),
        email: email,
        emailOptin,
        modifiedAt,
        username,
    });
};
