import { CustomWindow } from "./custom.window";

const LOGIN_EVENT_NAME = "Account Logged In";
const ACCOUNT_CREATED_EVENT_NAME = "Account Created"

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

export const initSegmentScript = (customWindow: CustomWindow) => {
var analytics = (customWindow.analytics = customWindow.analytics || []);
if (!analytics.initialize)
    if (analytics.invoked)
        window.console &&
            console.error &&
            console.error("Segment snippet included twice.");
    else {
        analytics.invoked = !0;
        analytics.methods = [
            "trackSubmit",
            "trackClick",
            "trackLink",
            "trackForm",
            "pageview",
            "identify",
            "reset",
            "group",
            "track",
            "ready",
            "alias",
            "debug",
            "page",
            "once",
            "off",
            "on",
            "addSourceMiddleware",
            "addIntegrationMiddleware",
            "setAnonymousId",
            "addDestinationMiddleware",
        ];
        analytics.factory = function (e: any) {
            return function () {
                var t = Array.prototype.slice.call(arguments);
                t.unshift(e);
                analytics.push(t);
                return analytics;
            };
        };
        for (var e = 0; e < analytics.methods.length; e++) {
            var key = analytics.methods[e];
            analytics[key] = analytics.factory(key);
        }
        analytics.load = function (key: any, e: any) {
            var t = document.createElement("script");
            t.type = "text/javascript";
            t.async = !0;
            t.src =
                "https://cdn.segment.com/analytics.js/v1/" +
                key +
                "/analytics.min.js";
            var n = document.getElementsByTagName("script")[0];
            n.parentNode && n.parentNode.insertBefore(t, n);
            analytics._loadOptions = e;
        };
        analytics._writeKey = "cdDnxCrdkgjL2RKpMaDdEwRSm0NWuLNo";
        analytics.SNIPPET_VERSION = "4.13.2";
    }
analytics.load("cdDnxCrdkgjL2RKpMaDdEwRSm0NWuLNo");
}
