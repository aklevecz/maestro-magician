import { findByInnerText } from "./utils";
var ADD_TO_CART_TEXT = "ADD TO CART";
var QUANTITY_TEXT = "Quantity";
var quantityWidgetClasses = ["QtyInputWrapper", "StyledQuantity"];
var BUTTON = "button";
var DIV = "div";
var hideElement = function (element) { return (element.style.display = "none"); };
var hideAddToCart = function (button) {
    if (button.innerText === ADD_TO_CART_TEXT) {
        hideElement(button);
    }
};
var hideQuantityWidgets = function (div) {
    quantityWidgetClasses.forEach(function (qClass) {
        if (div.className.indexOf(qClass) >= 0) {
            hideElement(div);
        }
    });
};
export var cartAndQuantityMutationCallback = function (mutationList, observer) {
    for (var _i = 0, mutationList_1 = mutationList; _i < mutationList_1.length; _i++) {
        var mutation = mutationList_1[_i];
        var target = mutation.target;
        findByInnerText(target, ADD_TO_CART_TEXT, BUTTON, hideAddToCart);
        findByInnerText(target, QUANTITY_TEXT, DIV, hideQuantityWidgets);
    }
};
