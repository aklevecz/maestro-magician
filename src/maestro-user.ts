import { CustomWindow } from "./custom.window";
import jwt_decode from "jwt-decode";
import { findByInnerText } from "./maestro-utils";
import {
    trackIdentify,
    trackUserLogin,
} from "./maestro-segment-calls";

export type UserRoles = {
    scope: string;
    pageId: string[];
    write: boolean;
};

type UserAttrs = {
    _id: string;
    email: string;
    marketingOptin: boolean;
    name: string;
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
};

type UIState = {
    login: boolean;
    signup: boolean;
    loginButton?: HTMLButtonElement | null;
    signupButton?: HTMLButtonElement | null;
    confirmButton?: HTMLButtonElement | null;
    email?: string;
    name?: string;
    emailOptin: boolean;
};

enum ElementTags {
    BUTTON = "button",
    INPUT = "input",
}

const initialUiState: UIState = {
    login: false,
    signup: false,
    loginButton: null,
    signupButton: null,
    confirmButton: null,
    emailOptin: false,
};

export class MaestroUser {
    private static TOKEN_PARTIAL = "accessToken";
    private static LOGIN_BUTTON_INNERTEXT = "LOG IN";

    public attrs: UserAttrs | null = null;
    private _authenticated: boolean = false;
    private _uiState = initialUiState;
    private _window: CustomWindow;

    constructor(window: CustomWindow) {
        this._window = window;
        const decodedJwt = this.getTokenFromStorage();
        if (decodedJwt) {
            this.attrs = decodedJwt;
            this._authenticated = true;
            this._userIdentify();
        }
        const dObserver = new MutationObserver(this.checkForUser.bind(this));
        dObserver.observe(document.body, { childList: true, subtree: true });
    }

    getTokenFromStorage(): UserAttrs | null {
        const keys = Object.keys(localStorage);
        const jwtKey = keys.find((key) =>
            key.includes(MaestroUser.TOKEN_PARTIAL)
        );
        if (jwtKey) {
            const jwt = localStorage.getItem(jwtKey);
            if (jwt) {
                return jwt_decode(jwt) as UserAttrs;
            }
        }
        return null;
    }

    checkForUser(mutationList: any) {
        const decodedJwt = this.getTokenFromStorage();
        if (decodedJwt && !this._authenticated) {
            this.attrs = decodedJwt;
            this._authenticated = true;
            this._userIdentify();
            if (this._uiState.login) {
                trackUserLogin(this.attrs.email, this.attrs.name, this._window);
            }
            this._uiState = initialUiState;
        } else if (!decodedJwt) {
            this._authenticated = false;
            this.attrs = null;
            this._lookForModal(mutationList);
        }
    }

    _lookForModal(mutationList: MutationRecord[]) {
        for (const mutation of mutationList) {
            const target = mutation.target.parentElement;
            if (target) {
                findByInnerText(
                    target,
                    MaestroUser.LOGIN_BUTTON_INNERTEXT,
                    ElementTags.BUTTON,
                    this._findLoginButton.bind(this)
                );
            }
        }
    }

    _findLoginButton(el: HTMLButtonElement) {
        if (el.innerText === MaestroUser.LOGIN_BUTTON_INNERTEXT) {
            this._uiState = {
                ...this._uiState,
                login: true,
                signup: false,
                loginButton: el,
            };
        }
    }

    _userIdentify() {
        if (!this.attrs) {
            return;
        }
        trackIdentify(
            this.attrs._id,
            this.attrs.created,
            this.attrs.email,
            this.attrs.marketingOptin,
            this.attrs.modified,
            this.attrs.name,
            this._window
        );

        this._applyWindowVarsForOverlays();
    }

    _applyWindowVarsForOverlays() {
        if (!this.attrs) {
            return;
        }
        this._window.userDisplayName = this.attrs.name;
        this._window.userAccountId = this.attrs._id;
        this._window.userDisplayNameSavedTime = Date.now();
        this._window.userEmail = this.attrs.email;
        this._window.modifiedAt = this.attrs.modified;
        this._window.service = this.attrs.service;
        this._window.roles = this.attrs.roles;
        this._window.siteId = this.attrs.siteId;
        this._window.created = this.attrs.created;
        this._window.iat = this.attrs.iat;
        this._window.exp = this.attrs.exp;
        this._window.subscriptions = this.attrs.subscriptions;
        this._window.uid = this.attrs.uid;
    }
}
