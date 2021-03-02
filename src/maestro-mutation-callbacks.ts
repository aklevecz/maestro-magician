import { findByInnerText } from "./maestro-utils";

const ADD_TO_CART_TEXT = "ADD TO CART";
const QUANTITY_TEXT = "Quantity";

const quantityWidgetClasses = ["QtyInputWrapper", "StyledQuantity"];

const BUTTON = "button";
const DIV = "div";

const hideElement = (element: HTMLElement) => (element.style.display = "none");

const hideAddToCart = (button: HTMLButtonElement) => {
    if (button.innerText === ADD_TO_CART_TEXT) {
        hideElement(button);
    }
};

const hideQuantityWidgets = (div: HTMLDivElement) => {
    quantityWidgetClasses.forEach((qClass: string) => {
        if (div.className.indexOf(qClass) >= 0) {
            hideElement(div);
        }
    });
};

export const cartAndQuantityMutationCallback = (
    mutationList: MutationRecord[]
) => {
    for (const mutation of mutationList) {
        const target = mutation.target.parentElement;
        if (target) {
            findByInnerText(target, ADD_TO_CART_TEXT, BUTTON, hideAddToCart);
            findByInnerText(target, QUANTITY_TEXT, DIV, hideQuantityWidgets);
        }
    }
};


export const createAccountOrLogin = (mutationList: MutationRecord[]) => {
    for (const mutation of mutationList) {
        const target = mutation.target.parentElement
        if (target) {
            
        }
    }
}