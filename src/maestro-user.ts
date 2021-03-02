import jwt_decode from "jwt-decode";
import { findByClassPartial, findByInnerText } from "./maestro-utils";
declare global {
    interface Window {
        analytics: any;
        m: any;
    }
}
type UserRoles = {
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
    emailOptin?: boolean;
};

export class MaestroUser {
    public attrs: UserAttrs = null;
    private _authenticated: boolean = false;
    private _uiState: UIState = {
        login: false,
        signup: false,
        loginButton: null,
        signupButton: null,
        confirmButton: null,
    };
    private _window: Window;

    private _boundConfirmButtonClick: EventListenerObject;

    constructor(window: Window) {
        this._window = window;
        const decodedJwt = this.getTokenFromStorage();
        if (decodedJwt) {
            this.attrs = decodedJwt;
            this._authenticated = true;
            this._userIdentify();
        }
        const dObserver = new MutationObserver(this.checkForUser.bind(this));
        dObserver.observe(document.body, { childList: true, subtree: true });

        this._boundConfirmButtonClick = this._onConfirmEmailButtonClick.bind(
            this
        );
    }

    getTokenFromStorage() {
        const keys = Object.keys(localStorage);
        const jwtKey = keys.find((key) => key.includes("accessToken"));
        const jwt = localStorage.getItem(jwtKey);
        if (jwt) {
            console.log("user signed in");
            return jwt_decode(jwt) as UserAttrs;
        } else {
            console.log("user is not signed in");
            return null;
        }
    }

    checkForUser(mutationList: any) {
        const decodedJwt = this.getTokenFromStorage();
        if (decodedJwt && !this._authenticated) {
            this.attrs = decodedJwt;
            this._authenticated = true;
            this._userIdentify();
            if (this._uiState.login) {
                window.analytics.track("Account Logged In - Client", {
                    email: this.attrs.email,
                    username: this.attrs.name,
                });
            }
        } else if (!decodedJwt) {
            this._authenticated = false;
            this.attrs = null;
            this._lookForModal(mutationList);
        }
    }

    _lookForModal(mutationList: any) {
        for (const mutation of mutationList) {
            const target = mutation.target.parentElement;
            findByInnerText(
                target,
                "SIGN UP",
                "button",
                this._findSignupButton.bind(this)
            );
            findByInnerText(
                target,
                "LOG IN",
                "button",
                this._findLoginButton.bind(this)
            );
            findByInnerText(
                target,
                "CONFIRM EMAIL",
                "button",
                this._findConfirmEmailButton.bind(this)
            );
        }
    }

    _findLoginButton(el: HTMLButtonElement) {
        if (el.innerText === "LOG IN") {
            this._uiState = { login: true, signup: false, loginButton: el };
            this._uiState.loginButton.addEventListener(
                "click",
                this._onLoginButtonClick.bind(this)
            );
        }
    }

    // NOT NCESSARY?
    _onLoginButtonClick() {
        this.getTokenFromStorage();
    }

    _findSignupButton(el: HTMLButtonElement) {
        if (el.innerText === "SIGN UP") {
            this._uiState = { login: false, signup: true, signupButton: el };
            this._uiState.signupButton.addEventListener(
                "click",
                this._onSignupButtonClick.bind(this)
            );
        }
    }

    _onSignupButtonClick() {
        const name = (document.getElementsByName("name")[0] as HTMLInputElement)
            .value;
        const email = (document.getElementsByName(
            "email"
        )[0] as HTMLInputElement).value;
        const optin = (findByClassPartial(
            document,
            "input",
            "Checkbox__Input"
        ) as HTMLInputElement).checked;

        this._uiState.name = name;
        this._uiState.email = email;
        this._uiState.emailOptin = optin;

        // THIS DOESNT DO ANYTHING AT THE MOMENT
        this._uiState.signupButton.removeEventListener(
            "click",
            this._onSignupButtonClick.bind(this)
        );
    }

    _findConfirmEmailButton(el: HTMLButtonElement) {
        if (el.innerText === "CONFIRM EMAIL") {
            if (this._uiState.confirmButton) {
                this._uiState.confirmButton.removeEventListener(
                    "click",
                    this._boundConfirmButtonClick
                );
            }
            this._uiState = { ...this._uiState, confirmButton: el };
            this._uiState.confirmButton.addEventListener(
                "click",
                this._boundConfirmButtonClick
            );
        }
    }

    _onConfirmEmailButtonClick() {
        if (this._uiState.email && this._uiState.name) {
            window.analytics.track("Account Created - Client", {
                authProvider: "email",
                email: this._uiState.email,
                username: this._uiState.name,
                emailOptin: this._uiState.emailOptin,
            });
        }
    }

    _userIdentify() {
        this._window.analytics.identify(this.attrs._id, {
            createdAt: new Date(this.attrs.created),
            email: this.attrs.email,
            emailOptin: this.attrs.marketingOptin,
            modifiedAt: this.attrs.modified,
            username: this.attrs.name,
        });
    }
}

