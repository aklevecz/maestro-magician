export const findByInnerText = (
    target: HTMLElement,
    innerText: string,
    childrenElementsType: string,
    callback: Function
) => {
    if (target.innerText && target.innerText.indexOf(innerText) >= 0) {
        target.querySelectorAll(childrenElementsType).forEach((el: Element) => {
            callback(el);
        });
    }
};

export const findByClassPartial = (
    document: HTMLDocument,
    elementType: string,
    classNamePartial: string
) => {
    const snapshot = document.evaluate(
        `//${elementType}[contains(@class, '${classNamePartial}')]`,
        document.body,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    if (snapshot.snapshotLength === 1) {
        return snapshot.snapshotItem(0);
    } else {
        console.error(
            "Error: Could not find the given node or there is more than one"
        );
        return null;
    }
};
