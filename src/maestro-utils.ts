export const findByInnerText = (
    target: HTMLElement,
    innerText: string,
    childrenElementsType: string,
    callback: Function
) => {
    if (target.innerText.indexOf(innerText) >= 0) {
        target
            .querySelectorAll(childrenElementsType)
            .forEach((el: Element) => {
                callback(el);
            });
    }
};

