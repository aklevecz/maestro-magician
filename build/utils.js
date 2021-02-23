export var findByInnerText = function (target, innerText, childrenElementsType, callback) {
    if (target.innerText.indexOf(innerText) >= 0) {
        target
            .querySelectorAll(childrenElementsType)
            .forEach(function (el) {
            callback(el);
        });
    }
};
