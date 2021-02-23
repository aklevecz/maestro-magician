import { findByInnerText } from "./maestro-utils";
const ADD_TO_CART_TEXT = "ADD TO CART";
const QUANTITY_TEXT = "Quantity";
const quantityWidgetClasses = ["QtyInputWrapper", "StyledQuantity"];
const BUTTON = "button";
const DIV = "div";

const hideElement = element => element.style.display = "none";

const hideAddToCart = button => {
  if (button.innerText === ADD_TO_CART_TEXT) {
    hideElement(button);
  }
};

const hideQuantityWidgets = div => {
  quantityWidgetClasses.forEach(qClass => {
    if (div.className.indexOf(qClass) >= 0) {
      hideElement(div);
    }
  });
};

export const cartAndQuantityMutationCallback = mutationList => {
  for (const mutation of mutationList) {
    const target = mutation.target.parentElement;

    if (target) {
      findByInnerText(target, ADD_TO_CART_TEXT, BUTTON, hideAddToCart);
      findByInnerText(target, QUANTITY_TEXT, DIV, hideQuantityWidgets);
    }
  }
};